# @reapit/utils-nest

## Authentication

### Basic 

Include the module with the below example

```ts
import { AuthModule } from '@reapit/utils-nest'
import { Module } from '@nestjs/common'

@Module({
  imports: [
    AuthModule.forRoot(),
  ],
})
export class AppModule {}
```

> Not the above does not include api-key-invoke verify 

Usage within controller below.

```ts
import { CredGuard, Creds, CredsType } from '@reapit/utils-nest'
import { UseGuards, Controller, Get, UnauthorizedException } from '@nestjs/common'

@UseGuards(CredGuard) // or AdminGuard (for admin verification)
@Controller()
export class ExampleController {
  @Get()
  async getExample(
    @Creds() creds: CredType,
  ): Promise<LoginIdentity> {
    if (creds.type === 'jwt') return creds
  }
}
```

### CredsType

There are 2 types of creds that can be returned. One is `jwt` which is a LoginIdentity type from `@reapit/connect` and `api-key` from `@reapit/api-key-verify`.

[ApiKey](https://github.com/reapit/foundations/blob/master/packages/foundations-ts-definitions/api-key-schema/index.ts#L6)  
[LoginIdentity](https://github.com/reapit/foundations/blob/ead3b87bf9ad2600dc95492e1835afecab846ad9/packages/connect-session/src/types.ts#L23)

### ApiKey Invoke Arn method

The below example is how to use the api-key-verify method to use the invoke function to verify api-keys from the api-key-service. This will enable api-key verification from CredGuard.

> AdminGuard is unable to use api-key authentication method

```ts
import { AuthModule } from '@reapit/utils-nest'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import authModuleConfig from './config/auth-module-config'

@Module({
  imports: [
    ConfigModule.forRoot([authModuleConfig]),
    AuthModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        apiKeyInvoke: {
          enabled: true,
          invokeArn: config.get('api-key-verify'),
        },
      }),
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
  ],
})
export class AppModule {}
```

### Ownership

the OwnershipProvider is for determining the ownership of entities with developerId. If the developerIds do not match between entity and credentials then a ForbiddenException will be throw (for 403 http status code response)

```ts
import { CredGuard, Creds, CredsType, OwnershipProvider } from '@reapit/utils-nest'
import { UseGuards, Controller, Get, UnauthorizedException, Param } from '@nestjs/common'

@UseGuards(CredGuard)
@Controller()
export class ExampleController {
  constructor (
    private readonly ownershipProvider: OwnershipProvider,
    private readonly catProvider: CatProvider,
  ) {}

  @Get()
  async getExample(
    @Creds() creds: CredsType,
    @Param('id') id: string,
  ): Promise<Catentity> {
    const cat = await this.catProvider.findOne(id) // entity with developerId?: string

    // automatically throws forbidden when developerIds do not match
    this.ownershipProvider.check<CatEntity>(cat, creds.developerId)

    return cat
  }
}
```

## CorsHeaderInterceptor

When using lambdas in AWS we've needed to send default headers back in responses for cors. The CorsHeaderInterceptor is used to add these headers to all responses

```ts
import { CorsHeaderInterceptor } from '@reapit/utils-nest'
import { NestFactory } from '@nestjs/common'
import { AppModule } from './app-module'

const bootstrapApplication = () => {
  ...
  const app = await NestFactory.create(AppModule)

  app.useGlobalInterceptors(new CorsHeaderInterceptor())

  return app
}

```
