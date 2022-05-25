import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app-module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DefaultHeaderInterceptor } from './default-header-interceptor'

export async function bootstrap() {
  console.log('inside bootstrap')
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  await app.init()
  console.log('app inited')
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new DefaultHeaderInterceptor())
  await app.listen(3000, () => console.log('listing to port, want to change this to a proxy to express'))
}
bootstrap()
