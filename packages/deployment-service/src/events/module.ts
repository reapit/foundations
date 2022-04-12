import { Module } from '@nestjs/common'
import { SqsProvider } from './sqs-provider'
import { SQS } from 'aws-sdk'
import { PusherProvider } from './pusher-provider'
import Pusher from 'pusher'
import { WorkflowHandlerProvider } from './workflow-handler-provider'
import { EventDispatcher } from './event-dispatcher'

@Module({
  providers: [
    {
      provide: SQS,
      useFactory: () => new SQS({ apiVersion: '2012-11-05', endpoint: process.env.SQS_ENDPOINT }),
    },
    SqsProvider,
    {
      provide: Pusher,
      useFactory: () =>
        new Pusher({
          appId: process.env.PUSHER_APPID as string,
          secret: process.env.PUSHER_SECRET as string,
          key: process.env.PUSHER_KEY as string,
          cluster: 'eu',
          useTLS: true,
        }),
    },
    PusherProvider,
    WorkflowHandlerProvider,
    EventDispatcher,
  ],
  exports: [SqsProvider, PusherProvider, EventDispatcher],
})
export class EventModule {}
