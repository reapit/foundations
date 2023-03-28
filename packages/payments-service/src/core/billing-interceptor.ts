import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { Request } from 'express'
import { SQS } from 'aws-sdk'
import config from '../../config.json'

const sqs = new SQS()

@Injectable()
export class BillingInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<Request>()
    const { params, method, headers } = request

    let path = request.path

    if (params) {
      Object.keys(params).forEach((key) => {
        if (path.includes(params[key])) {
          path = path.replace(params[key], `{${key}}`)
        }
      })
    }

    const message = {
      MessageBody: JSON.stringify({
        ApplicationId: headers['reapit-app-id'],
        ServiceName: 'paymentsProxy',
        EndpointRoute: path,
        EndpointMethod: method,
        EndpointVersion: 'latest',
        CustomerId: headers['reapit-customer'],
        RequestId: null,
        TimeStamp: new Date().toISOString(),
      }),
      QueueUrl: `https://sqs.eu-west-2.amazonaws.com/${config.AWS_ACCOUNT_ID}/Platform_Billing_HttpTrafficEvents`,
    }

    const sendMessage = () =>
      new Promise<void>((resolve, reject) => {
        sqs.sendMessage(message, (err, data) => {
          if (err) {
            console.log('Error sending billing message', err)
            reject(err)
          }

          if (data) {
            resolve()
          }
        })
      })

    await sendMessage()

    return next.handle()
  }
}
