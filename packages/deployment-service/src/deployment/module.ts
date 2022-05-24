import { S3Module } from '../s3'
import { Module } from '@nestjs/common'
import { DeployProvider } from './deploy-provider'
import { CloudFrontClient } from '@aws-sdk/client-cloudfront'
import roleCredentials, { RoleCredentialsType } from '../config/role-credentials'
import { getRoleCredentials } from '../s3/assumed-s3-client'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [S3Module, ConfigModule.forFeature(roleCredentials)],
  providers: [
    {
      provide: CloudFrontClient,
      useFactory: async (config: ConfigService) => {
        return new CloudFrontClient({
          credentials: await getRoleCredentials(
            config.get<RoleCredentialsType>('role-credentials') as RoleCredentialsType,
          ),
          region: process.env.REGION,
        })
      },
      inject: [ConfigService],
    },
    DeployProvider,
  ],
  exports: [DeployProvider],
})
export class DeploymentModule {}
