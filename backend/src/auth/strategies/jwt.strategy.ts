import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'fallback_secret',
    });
  }

  async validate(payload: any) {
    //console.log('JWT Validate Payload:', payload);
    const user = await this.usersService.findById(payload.sub);
    //console.log('JWT Validate User Found:', !!user);
    if (!user) {
      return null;
    }
    const { password, ...result } = user;
    return {
      ...result,
      empresaName: (user as any).empresa?.name,
    };
  }
}
