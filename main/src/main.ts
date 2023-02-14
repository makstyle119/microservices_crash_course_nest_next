import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'main_queue',
      queueOptions: {
        durable: false,
      },
    },
  });
  app.listen().then(() => {
    console.log('Micro Service is listen');
  });
  // try {
  //   const app = await NestFactory.create(AppModule, {
  //     abortOnError: false,
  //   });
  //   await app.listen(8001);
  // } catch (err) {
  //   console.log(err, 'error'); // <-- for example, ECONNREFUSED error
  // }
  // const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('api');
  // app.enableCors({
  //   origin: 'http://localhost:2400',
  // });
  // await app.listen(8001);
}
bootstrap();
