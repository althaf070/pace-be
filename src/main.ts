import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-expectations.filter';
import { SuccessResponseInterceptor } from './common/interceptors/success-response.interceptor';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:3000', // Frontend URL
    credentials: true, // ✅ Allow cookies to be sent
  });

  app.useGlobalFilters(new AllExceptionsFilter());

  app.useGlobalInterceptors(new SuccessResponseInterceptor());
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
