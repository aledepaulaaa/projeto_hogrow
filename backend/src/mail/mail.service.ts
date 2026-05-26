import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(MailService.name);

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST || 'sandbox.smtp.mailtrap.io',
      port: Number(process.env.MAIL_PORT) || 2525,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  async sendPasswordResetEmail(to: string, token: string) {
    const resetLink = `http://localhost:5173/reset-password?token=${token}`;
    
    // Resolve absolute path to the logo
    // Using process.cwd() since the app runs from the backend root
    const logoPath = path.resolve(process.cwd(), 'public', 'logo.png');
    let logoAttachment: any = [];
    
    if (fs.existsSync(logoPath)) {
      logoAttachment = [{
        filename: 'logo.png',
        path: logoPath,
        cid: 'hogrowlogo'
      }];
    }

    const htmlTemplate = `
      <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 20px;">
          ${logoAttachment.length > 0 ? '<img src="cid:hogrowlogo" alt="HoGrow Logo" style="max-width: 150px;" />' : '<h1 style="color: #1D2C5C;">HoGrow</h1>'}
        </div>
        <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          <h2 style="color: #1D2C5C; margin-top: 0;">Recuperação de Senha</h2>
          <p style="color: #333; line-height: 1.6;">Você solicitou a redefinição da sua senha. Clique no botão abaixo para criar uma nova senha.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" style="background-color: #FFAA01; color: #1D2C5C; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 4px; display: inline-block;">Redefinir Minha Senha</a>
          </div>
          <p style="color: #666; font-size: 12px; margin-bottom: 0;">Se você não solicitou isso, pode ignorar este e-mail. Seu link expira em 1 hora.</p>
        </div>
      </div>
    `;

    try {
      await this.transporter.sendMail({
        from: process.env.MAIL_FROM || '"HoGrow Support" <support@hogrow.com>',
        to,
        subject: 'Redefinição de Senha - HoGrow',
        html: htmlTemplate,
        attachments: logoAttachment,
      });
      this.logger.log(`Password reset email sent to ${to}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${to}`, error);
    }
  }
}
