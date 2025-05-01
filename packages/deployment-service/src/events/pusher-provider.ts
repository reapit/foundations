import { Injectable } from '@nestjs/common'
import { instanceToPlain } from 'class-transformer'
import Pusher, { Response } from 'pusher'

@Injectable()
export class PusherProvider {
  constructor(private readonly pusher: Pusher) {}

  trigger<T extends any>(channel: string | string[], event: string, data: T): Promise<Response> {
    return this.pusher.trigger(channel, event, instanceToPlain(data))
  }

  triggerArray<T extends any>(entries: { channel: string; name: string; data: T }[]): Promise<Response> {
    return this.pusher.triggerBatch(
      entries.map((entry) => ({
        ...entry,
        data: instanceToPlain(entry.data),
      })),
    )
  }

  authenticate(socket_id: string, channel_name: string) {
    return this.pusher.authenticate(socket_id, channel_name)
  }
}
