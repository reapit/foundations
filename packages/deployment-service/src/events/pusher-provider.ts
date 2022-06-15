import { Injectable } from '@nestjs/common'
import Pusher, { Response } from 'pusher'

@Injectable()
export class PusherProvider {
  constructor(private readonly pusher: Pusher) {}

  trigger<T extends any>(channel: string | string[], event: string, data: T): Promise<Response> {
    return this.pusher.trigger(channel, event, data)
  }

  triggerArray<T extends any>(entries: { channel: string; name: string; data: T }[]): Promise<Response> {
    return this.pusher.triggerBatch(entries)
  }

  authenticate(socket_id: string, channel_name: string) {
    return this.pusher.authenticate(socket_id, channel_name)
  }
}
