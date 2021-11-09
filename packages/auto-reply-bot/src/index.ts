import { createLambdaFunction, createProbot } from '@probot/adapter-aws-lambda-serverless'

const whitelistEmail = 'reapit.com'

export const webhooks = createLambdaFunction(
  (app) => {
    app.on('issues.opened', async (event) => {
      const authorEmail = event.payload.sender.email

      if (authorEmail.split('@').pop() === whitelistEmail) {
        // avoid reapit employees
        // TODO check sender.email is reapit email and not primary email
        return
      }

      return Promise.all([
        event.octokit.issues.createComment(event.issue({ body: 'Hello :wave:' })),
        event.octokit.issues.addLabels(event.issue({ labels: ['awaiting triage'] })),
      ])
    })
  },
  { probot: createProbot() },
)
