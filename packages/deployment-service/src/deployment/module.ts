import { S3Module } from '../s3'
import { Module } from '@nestjs/common'
import { DeployProvider } from './deploy-provider'
import { AwsModule } from '../aws'

@Module({
  imports: [S3Module, AwsModule],
  providers: [DeployProvider],
  exports: [DeployProvider],
})
export class DeploymentModule {}
