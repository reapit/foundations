import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app-module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DefaultHeaderInterceptor } from './default-header-interceptor'

export async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new DefaultHeaderInterceptor())
  await app.listen(3000)
}
// bootstrap()
