/* eslint-disable max-len */
import 'isomorphic-fetch'
import crypto from 'crypto'
import serverless from 'serverless-http'
import express, { Request, Response, NextFunction } from 'express'
import qs from 'query-string'
import bodyParser from 'body-parser'
import cors from 'cors'
import { Context, APIGatewayProxyEvent } from 'aws-lambda'

const app = express() as any
const expressApp = serverless(app)

export const sendMessageToSlack = async (message: string) => {
  const slackHook = process.env.SLACK_BOT_HOOK as string
  const result = await fetch(slackHook, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: message,
    }),
  })
  console.info('sendMessageToSlack', result.statusText)
  return result.status
}

// For this function please refer this documentation https://api.slack.com/authentication/verifying-requests-from-slack
export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const timestamp = req.headers['x-slack-request-timestamp']
  // convert current time from milliseconds to seconds
  const MILISECOND_BY_ONE_SECOND = 1000
  const TIME_OUT = 300
  const timeBySecond = Math.floor(new Date().getTime() / MILISECOND_BY_ONE_SECOND)
  if (Math.abs(timeBySecond - Number(timestamp)) > TIME_OUT) {
    console.log({ message: 'Request Time Out' })
    return res.status(400).send('Request Time Out')
  }
  const slackSignature = req.headers['x-slack-signature'] as string
  const signBaseString = `v0:${timestamp}:${qs.stringify(req.body)}`
  const slackSigningSecret = process.env.SLACK_BOT_SIGNING_SECRET as string

  let mySignature = `v0=${crypto
    .createHmac('sha256', slackSigningSecret)
    .update(signBaseString, 'utf8')
    .digest('hex')}`
  const isAcceptRequest = crypto.timingSafeEqual(Buffer.from(mySignature, 'utf8'), Buffer.from(slackSignature, 'utf8'))
  console.log({ isAcceptRequest })
  console.log({ message: `isAcceptRequest ${String(isAcceptRequest)}` })
  if (!isAcceptRequest) {
    return res.status(400).send('Verification failed')
  }
  next()
}

export type GenerateMessageParams = {
  packageName: string
  currentTag: string
  previousTag: string
  environment: string
}

const generateMessage = ({ packageName, environment, currentTag, previousTag }: GenerateMessageParams) => {
  return {
    'release-note': `Generating release note for \`${packageName}\` tag \`${currentTag}\`. Roll back version is \`${previousTag}\``,
    release: `Releasing \`${packageName}\` ${environment} \`${currentTag}\``,
    'update-release-note': `Updating release note for \`${packageName}\` tag \`${currentTag}\`.`,
    'delete-environment': `Teardown serverless \`${packageName}\` for \`${environment}\``,
  }
}

const dispatchGithubActions = async body => {
  const headers = {
    Accept: 'application/vnd.github.everest-preview+json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  }
  const githubUrl = process.env.REPO_DISPATCH_API as string
  const result = await fetch(githubUrl, {
    headers,
    method: 'POST',
    body: JSON.stringify(body),
  } as RequestInit)
  return result
}

const generateBodyForDispatch = async ({ eventType, args, packageName }) => {
  if (eventType === 'release-note' || eventType === 'update-release-note') {
    const releaseTag = args?.[3]
    const rollbackTag = args?.[4]
    await sendMessageToSlack(
      generateMessage({ currentTag: releaseTag, previousTag: rollbackTag, packageName, environment: '' })[eventType],
    )
    return {
      event_type: eventType,
      client_payload: {
        package_name: packageName,
        current_tag: releaseTag,
        previous_tag: rollbackTag,
      },
    }
  }

  if (eventType === 'release') {
    const releaseTag = args?.[3]
    const rollbackTag = args?.[4]
    const environment = args?.[5]
    await sendMessageToSlack(
      generateMessage({ currentTag: releaseTag, previousTag: rollbackTag, packageName, environment: environment })[
        eventType
      ],
    )
    return {
      event_type: eventType,
      client_payload: {
        package_name: packageName,
        current_tag: releaseTag,
        previous_tag: rollbackTag,
        environment,
      },
    }
  }

  if (eventType === 'delete-environment') {
    const environment = args?.[3]
    await sendMessageToSlack(
      generateMessage({ currentTag: '', previousTag: '', packageName, environment: environment })[eventType],
    )
    return {
      event_type: eventType,
      client_payload: {
        package_name: packageName,
        environment: environment,
      },
    }
  }
}

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.post('/release', async (req: Request, res: Response) => {
  const textFromSlack = req?.body?.event?.text || ''
  console.info(textFromSlack)
  const args = textFromSlack.split(' ')
  const eventType = args?.[1]
  const packageName = args?.[2]

  if (eventType === 'help') {
    await sendMessageToSlack(`
\`@Reapit Cloud Releases help\` <= The command will show you the way to use release bot \n
\`@Reapit Cloud Releases release-note <package_name> <release_tag> <roll_back_tag>\` <= The command will generate the release note\n
\`@Reapit Cloud Releases release <package_name> <release_tag> <roll_back_tag> <environment>\` <= The command will do the release and environment is development by default\n
\`@Reapit Cloud Releases update-release-note <package_name> <release_tag> <roll_back_tag>\` <= The command will do update the release note in github and document\n
\`@Reapit Cloud Releases delete-environment <package_name> <environment>\` <= The command will remove the infrastructure\n
    `)
    return res.send({ challenge: req.body.challenge, status: 200 })
  }

  if (!packageName) {
    await sendMessageToSlack('You need to input the package want to release')
    return res.send({ challenge: req.body.challenge, status: 200 })
  }

  const body = await generateBodyForDispatch({ eventType, args, packageName })
  const result = await dispatchGithubActions(body)
  if (result.status === 204) {
    res.status(200)
    return res.send({ challenge: req.body.challenge, status: 200 })
  }
  await sendMessageToSlack('Cannot run the command')
  return res.send({ challenge: req.body.challenge, status: 200 })
})

export const handler = async (event: APIGatewayProxyEvent, context: Context) => {
  return expressApp(event, context)
}
