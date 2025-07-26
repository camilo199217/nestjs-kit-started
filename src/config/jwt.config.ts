import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { Algorithm } from 'jsonwebtoken';

export default (configService: ConfigService): JwtModuleOptions => ({
  global: true,
  secret: configService.get<string>('jwt.secret'),
  signOptions: {
    algorithm: configService.get<string>('JWT_ALGORITHM') as Algorithm,
    expiresIn: '60s',
  },
});
