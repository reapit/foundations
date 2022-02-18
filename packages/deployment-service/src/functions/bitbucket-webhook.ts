import {
  httpHandler,
} from '@homeservenow/serverless-aws-handler'

export const bitbucketWebhook = httpHandler<any, void>({
  handler: async ({ body, event }) => {
    console.log('event', body)
    console.log('headers', event.headers)

    switch(body.eventType) {
      case "installed":
        console.log('save the details to db against repo. Not quiet sure though as no repo details provided')
        break
      default:

    }
    return {}
  },
})
