import { getRoleCredentials } from '../s3/assumed-s3-client'
import { Module } from '@nestjs/common'
import { SSM } from 'aws-sdk'
import { ConfigModule, ConfigService } from '@nestjs/config'
import roleCredentials, { RoleCredentialsType } from '../config/role-credentials'
import { KeyController } from './key-controller'
import { AuthModule } from '../auth'
import { PipelineModule } from '../pipeline'

@Module({
  imports: [ConfigModule.forFeature(roleCredentials), AuthModule, PipelineModule],
  providers: [
    {
      provide: SSM,
      useFactory: async (config: ConfigService) =>
        new SSM({
          credentials: await getRoleCredentials(
            config.get<RoleCredentialsType>('role-credentials') as RoleCredentialsType,
          ),
        }),
      inject: [ConfigService],
    },
  ],
  controllers: [KeyController],
})
export class KeyModule {}
