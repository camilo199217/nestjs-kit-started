import { ConfigService } from '@nestjs/config';
import { ThrottlerModuleOptions } from '@nestjs/throttler';

const rateLimitConfig = (
  configService: ConfigService,
): ThrottlerModuleOptions => ({
  throttlers: [
    {
      ttl: configService.get<number>('rateLimit.ttl') ?? 10,
      limit: configService.get<number>('rateLimit.limit') ?? 10,
    },
  ],
});

export default rateLimitConfig;
