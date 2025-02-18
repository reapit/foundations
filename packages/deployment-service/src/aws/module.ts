import roleCredentials from '../config/role-credentials'
import { getRoleCredentials, RoleCredentialsType } from './assumed-role-credentials'
import { CloudFrontClient } from '@aws-sdk/client-cloudfront'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { CodeBuild, Credentials, S3, SSM, SQS } from 'aws-sdk'
import { Route53Client } from '@aws-sdk/client-route-53'
import { ACMClient } from '@aws-sdk/client-acm'

export const ROLE_CREDENTIALS = 'ROLE_CREDENTIALS'

@Module({
  imports: [ConfigModule.forFeature(roleCredentials)],
  providers: [
    {
      provide: ROLE_CREDENTIALS,
      useFactory: async (config: ConfigService) =>
        getRoleCredentials(config.get<RoleCredentialsType>('role-credentials') as RoleCredentialsType),
      inject: [ConfigService],
    },
    {
      provide: CodeBuild,
      useFactory: async (credentials: Credentials) =>
        new CodeBuild({
          credentials,
        }),
      inject: [ROLE_CREDENTIALS],
    },
    {
      provide: S3,
      useFactory: async (credentials: Credentials) => {
        return new S3({
          credentials,
        })
      },
      inject: [ROLE_CREDENTIALS],
    },
    {
      provide: SSM,
      useFactory: async (credentials: Credentials) =>
        new SSM({
          credentials,
        }),
      inject: [ROLE_CREDENTIALS],
    },
    {
      provide: CloudFrontClient,
      useFactory: async (credentials: Credentials) =>
        new CloudFrontClient({
          credentials,
        }),
      inject: [ROLE_CREDENTIALS],
    },
    {
      provide: Route53Client,
      useFactory: (credentials) =>
        new Route53Client({
          region: 'us-east-1',
          credentials,
        }),
      inject: [ROLE_CREDENTIALS],
    },
    {
      provide: SQS,
      useFactory: () => new SQS({ apiVersion: '2012-11-05', endpoint: process.env.SQS_ENDPOINT }),
    },
    {
      provide: ACMClient,
      useFactory: (credentials) =>
        new ACMClient({
          region: 'us-east-1',
          credentials,
        }),
      inject: [ROLE_CREDENTIALS],
    },
  ],
  exports: [S3, CodeBuild, SSM, ROLE_CREDENTIALS, CloudFrontClient, Route53Client, SQS, ACMClient],
})
export class AwsModule {}
