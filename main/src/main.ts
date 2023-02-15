import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      abortOnError: false,
    });
    app.setGlobalPrefix('api');
    app.enableCors({
      origin: 'http://localhost:4200',
    });
    await app.listen(8001);
  } catch (err) {
    console.log(err, 'error'); // <-- for example, ECONNREFUSED error
  }
}
bootstrap();
