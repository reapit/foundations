import Pusher from 'pusher'

export const pusher = new Pusher({
  appId: process.env.PUSHER_APPID as string,
  secret: process.env.PUSHER_SECRET as string,
  key: process.env.PUSHER_KEY as string,
  cluster: 'eu',
  useTLS: true,
})
