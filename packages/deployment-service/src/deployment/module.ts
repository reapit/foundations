import { S3Module } from '../s3'
import { Module } from '@nestjs/common'
import { DeployProvider } from './deploy-provider'

@Module({
  imports: [S3Module],
  providers: [DeployProvider],
  exports: [DeployProvider],
})
export class DeploymentModule {}
