# @reapit/utils-nest

## Authentication

### IdToken Guard

This Guard will use an id-token for the authentication token and will be verified and decoded for credentials

Include the module with the below example

```ts
import { AuthModule } from '@reapit/utils-nest'
import { Module } from '@nestjs/common'

@Module({
  imports: [
    AuthModule.forRootAsync({
      useFactory: () => ({ env: 'dev' }),
    }),
  ],
})
export class AppModule {}
```

> Not the above does not include api-key-invoke verify 

Usage within controller below.

```ts
import { IdTokenGuard, Creds, CredsType } from '@reapit/utils-nest'
import { UseGuards, Controller, Get, UnauthorizedException } from '@nestjs/common'

@UseGuards(IdTokenGuard)
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

### Access Token Guard

The access token guard will use the userInfo platform endpoint to verify that the user is logged in and set the response (user info) as the credentials 

```ts
import { AccessTokenGuard, Creds, CredsType } from '@reapit/utils-nest'
import { UseGuards, Controller, Get, UnauthorizedException } from '@nestjs/common'

@UseGuards(AccessTokenGuard)
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

One Creds come from a valid `jwt` which is a LoginIdentity type from `@reapit/connect-session-server`.

[LoginIdentity](https://github.com/reapit/connect-session-server)

### Admin checks

There are 2 scopes for admins in Reapit. One is readonly and the other is write admin. We use 2 different guards to handle the differences between them shown below. 

#### Readonly Guard

This guard makes sure the user has a `ReapitEmployee` scope. Notice that the guard decorator is on the function and not the class.

```ts
import { Controller, Get, UseGuards } from '@nestjs/common'
import { AdminReadonlyGuard, IdTokenGuard } from '@reapit/utils-nest'

@Controller('pipeline')
export class PipelineController {

  @Get('')
  @UseGaurds(IdTokenGuard, AdminReadonlyGuard)
  async paginate() {
    // Here the user is a readonly admin
  }
}
```

> When using AdminReadonlyGuard, make sure to use either IdTokenGuard or AccessTokenGuard beforehand
> @UseGuard(AccessTokenGuard, AdminReadonlyGuard)

#### Write Guard

This guard makes sure the user has a `ReapitEmployeeFoundationsAdmin` scope. Notice that the guard decorator is on the function and not the class.

```ts
import { Controller, Get, UseGuards } from '@nestjs/common'
import { AdminWriteGuard, IdTokenGuard } from '@nestjs/utils-nest'

@Controller('pipeline')
export class PipelineController {

  @Post('')
  @UseGaurds(IdTokenGuard, AdminWriteGuard)
  async create() {
    // Here the user is a write admin
  }
}
```

> When using AdminWriteGuard, make sure to use either IdTokenGuard or AccessTokenGuard beforehand
> @UseGuard(AccessTokenGuard, AdminWriteGuard)

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
