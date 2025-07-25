import { DocumentBuilder } from '@nestjs/swagger';

export default new DocumentBuilder()
  .setTitle('Acadyo API')
  .setDescription('API para la gestión de academias')
  .setVersion('1.0')
  .build();
