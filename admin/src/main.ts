import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // try {
  //   const app = await NestFactory.create(AppModule, {
  //     abortOnError: false,
  //   });
  //   await app.listen(8000);
  // } catch (err) {
  //   console.log(err, 'error'); // <-- for example, ECONNREFUSED error
  // }
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(8000);
}
bootstrap();
