import { httpHandler } from '@homeservenow/serverless-aws-handler'
import { pusher } from '../services'
import Pusher from 'pusher'
import { resolveCreds } from '../utils'

export const pusherAuthentication = httpHandler<{ socket_id: string; channel_name: string }, Pusher.AuthResponse>({
  defaultOutputHeaders: {
    'Access-Control-Allow-Origin': '*',
  },
  serialise: {
    input: (event) => {
      return JSON.parse(
        '{"' +
          decodeURI(event.body as string)
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"') +
          '"}',
      )
    },
  },
  handler: async ({ event, body }) => {
    const { socket_id, channel_name } = body

    await resolveCreds(event)

    const auth = pusher.authenticate(socket_id, channel_name)

    return auth
  },
})
