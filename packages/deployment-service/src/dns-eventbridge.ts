import { EventBridgeHandler } from 'aws-lambda'

export const handler: EventBridgeHandler = async (event) => {
  console.log('event', event)
}
