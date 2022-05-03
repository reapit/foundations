import { S3Provider } from './s3.provider'
import { S3 } from 'aws-sdk'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { RoleCredentialsType } from '../config/role-credentials'
import roleCredentials from '../config/role-credentials'
import { getRoleCredentials } from './assumed-s3-client'

@Module({
  imports: [ConfigModule.forFeature(roleCredentials)],
  providers: [
    {
      provide: S3,
      useFactory: async (config: ConfigService) => {
        return new S3({
          region: process.env.REGION,
          // TODO check node_env is correct here
          credentials:
            process.env.NODE_ENV === 'production'
              ? await getRoleCredentials(config.get<RoleCredentialsType>('role-credentials') as RoleCredentialsType)
              : undefined,
        })
      },
      inject: [ConfigService],
    },
    S3Provider,
  ],
  exports: [S3Provider],
})
export class S3Module {}
