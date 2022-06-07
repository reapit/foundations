import { S3Provider } from './s3.provider'
import { Module } from '@nestjs/common'
import { AwsModule } from '../aws'

@Module({
  imports: [AwsModule],
  providers: [S3Provider],
  exports: [S3Provider],
})
export class S3Module {}
