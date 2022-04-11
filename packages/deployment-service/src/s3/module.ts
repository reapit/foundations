import { S3Provider } from './s3.provider'
import { S3 } from 'aws-sdk'
import { Module } from '@nestjs/common'

@Module({
  providers: [
    {
      provide: S3,
      useFactory: () =>
        new S3({
          region: process.env.REGION,
        }),
    },
    S3Provider,
  ],
  exports: [S3Provider],
})
export class S3Module {}
