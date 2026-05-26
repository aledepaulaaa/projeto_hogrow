import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    @Inject('MAIL_SERVICE') private readonly mailClient: ClientProxy,
    private readonly mailService: MailService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any, userAgent?: string) {
    // Detecta a plataforma do usuario com base no User-Agent
    let platform = 'Chrome PC';
    if (userAgent) {
      const ua = userAgent.toLowerCase();
      if (ua.includes('android')) {
        platform = 'Mobile Android';
      } else if (ua.includes('iphone') || ua.includes('ipad') || ua.includes('ipod')) {
        platform = 'Mobile iOS';
      } else if (ua.includes('firefox')) {
        platform = 'Firefox PC';
      } else if (ua.includes('safari') && !ua.includes('chrome')) {
        platform = 'Safari Mac';
      }
    }

    // Cria o registro de acesso no banco de dados
    try {
      await this.prisma.accessLog.create({
        data: {
          platform,
          userId: user.id,
        },
      });
    } catch (e) {
      console.error('Falha ao registrar log de acesso:', e);
    }

    const payload = { email: user.email, sub: user.id };
    const formattedUser = {
      ...user,
      empresaName: user.empresa?.name,
    };
    return {
      user: formattedUser,
      tokens: {
        accessToken: this.jwtService.sign(payload),
      },
    };
  }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    if (registerDto.password !== registerDto.passwordConfirm) {
      throw new BadRequestException('Passwords do not match');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    
    // Excluir passwordConfirm e empresaName do payload enviado ao Prisma
    const { passwordConfirm, empresaName, ...userData } = registerDto;
    
    let empresaId: string | undefined = undefined;

    if (empresaName && empresaName.trim()) {
      const trimmedName = empresaName.trim();
      // Busca case-insensitive
      let empresa = await this.prisma.empresa.findFirst({
        where: {
          name: {
            equals: trimmedName,
            mode: 'insensitive',
          },
        },
      });

      if (!empresa) {
        empresa = await this.prisma.empresa.create({
          data: {
            name: trimmedName,
          },
        });
      }

      empresaId = empresa.id;
    }

    const user = await this.usersService.create({
      ...userData,
      empresaId,
      password: hashedPassword,
    });

    const { password, ...result } = user;
    return this.login(result);
  }

  async forgotPassword(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      // Do not reveal that the user does not exist
      return;
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date();
    expires.setHours(expires.getHours() + 1); // 1 hour expiration

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        resetPasswordToken: token,
        resetPasswordExpires: expires,
      },
    });

    // Envia o e-mail de redefinição de senha diretamente via Nodemailer (Mailtrap)
    await this.mailService.sendPasswordResetEmail(email, token);

    // Tenta emitir o evento para a fila do RabbitMQ se configurado
    try {
      this.mailClient.emit('send_reset_email', { email, token });
    } catch (e) {
      // Ignora silenciosamente se o RabbitMQ estiver indisponível
    }
  }

  async resetPassword(token: string, newPassword: string) {
    if (!token) throw new BadRequestException('Token is required');

    const user = await this.prisma.user.findFirst({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: {
          gt: new Date(), // must be greater than current time
        },
      },
    });

    if (!user) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
    });
  }
}
