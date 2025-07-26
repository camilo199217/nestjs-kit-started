import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './config';
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const swaggerPath = configService.get<string>('swaggerPath') || 'api';

  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(swaggerPath, app, documentFactory);

  app.useGlobalPipes(
    new I18nValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      stopAtFirstError: true,
    }),
  );

  app.useGlobalFilters(
    new I18nValidationExceptionFilter({
      responseBodyFormatter(_host, exc) {
        const err: Record<string, string[]> = {};

        for (const error of exc.errors) {
          if (!err[error.property]) {
            err[error.property] = [];
          }
          err[error.property] = Object.values(error.constraints as object)[0];
        }
        return err;
      },
    }),
  );

  const expressApp = app.getHttpAdapter().getInstance();

  /**
   * Por motivos de seguridad, se remueve este Header
   * @link https://calcomsoftware.com/a-comprehensive-guide-to-x-powered-by-header/
   */
  expressApp.disable('x-powered-by');

  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
