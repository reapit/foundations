import { httpHandler } from '@homeservenow/serverless-aws-handler'
import { pusher } from '../services'
import Pusher from 'pusher'

export const pusherAuthentication = httpHandler<{ socketId: string; channel: string }, Pusher.AuthResponse>({
  defaultOutputHeaders: {
    'Access-Control-Allow-Origin': '*',
  },
  handler: async ({ body }) => {
    const { socketId, channel } = body
    const auth = pusher.authenticate(socketId, channel)

    return auth
  },
})
