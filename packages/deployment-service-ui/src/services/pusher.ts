import Pusher, { Channel } from 'pusher-js'

export const pusher = new Pusher(process.env.PUSHER_KEY as string, {
  cluster: 'eu',
})

export const channelCreator = (developerId: string): Channel => {
  return pusher.subscribe(developerId)
}
