import { Injectable } from '@nestjs/common'
import { S3 } from 'aws-sdk'

@Injectable()
export class S3Provider {
  constructor(private readonly s3Client: S3) {}

  upload(Bucket: string, Key: string, Body: Buffer | string, extra?: Partial<S3.PutObjectRequest>): Promise<void> {
    return new Promise((resolve, reject) =>
      this.s3Client.putObject(
        {
          Key,
          Bucket,
          Body,
          ...extra,
        },
        (error) => {
          if (error) reject(error)
          resolve()
        },
      ),
    )
  }
}
