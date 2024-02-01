import { NestFactory } from '@nestjs/core';
import { AccountsModule } from './accounts.module';
import { useContainer } from 'class-validator';
// import * as cookiesParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AccountsModule);
  useContainer(app, { fallbackOnErrors: true });
  app.enableCors();
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // app.connectMicroservice({
  //   transport: Transport.TCP,
  //   options: {
  //     host: '0.0.0.0',
  //     port: configService.get('TCP_PORT'),
  //   },
  // });

  // app.use(cookiesParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    console.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}
bootstrap();
