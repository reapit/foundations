import { Injectable } from '@nestjs/common'
import { S3 } from 'aws-sdk'

@Injectable()
export class S3Provider {
  constructor(private readonly s3Client: S3) {}

  upload(params: S3.PutObjectRequest): Promise<any> {
    return new Promise((resolve, reject) =>
      this.s3Client.putObject(params, (error, data) => {
        if (error) reject(error)
        resolve(data)
      }),
    )
  }

  getSignedUrlPromise(method: string, params: any): Promise<any> {
    return this.s3Client.getSignedUrlPromise(method, params)
  }

  deleteObject(params: S3.DeleteObjectRequest): Promise<void> {
    return new Promise((resolve, reject) =>
      this.s3Client.deleteObject(params, (error) => {
        if (error) reject(error)
        resolve()
      }),
    )
  }

  getObject(params: S3.GetObjectRequest): Promise<S3.GetObjectOutput> {
    return new Promise((resolve, reject) =>
      this.s3Client.getObject(params, (error, data) => {
        if (error) reject(error)
        resolve(data)
      }),
    )
  }
}
