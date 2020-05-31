import 'isomorphic-fetch'
import crypto from 'crypto'
import serverless from 'serverless-http'
import express, { Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { Context, APIGatewayProxyEvent } from 'aws-lambda'

const app = express()
const expressApp = serverless(app)

export const queryParams = (params: Object) => {
  return Object.keys(params)
    .filter(key => params[key] !== undefined && params[key] !== null && params[key] !== '')
    .map(key => {
      if (Array.isArray(params[key])) {
        return params[key].map((value: any) => `${key}=${value}`).join('&')
      }
      return `${key}=${params[key]}`
    })
    .join('&')
}

export const sendMessageToSlack = (message: string) => {
  const slackHook = process.env.SLACK_BOT_HOOK as string
  fetch(slackHook, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: message,
    }),
  })
}

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const timestamp = req.headers['x-slack-request-timestamp']
  // convert current time from milliseconds to seconds
  const MILISECOND_BY_ONE_SECOND = 1000
  const time = Math.floor(new Date().getTime() / MILISECOND_BY_ONE_SECOND)
  if (Math.abs(time - Number(timestamp)) > 300) {
    console.log({ message: 'Request Time Out' })
    return res.status(400).send('Request Time Out')
  }
  const slackSignature = req.headers['x-slack-signature'] as string
  const signBaseString = `v0:${timestamp}:${queryParams(req.body)}`
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

const generateMessage = (currentTag: string, previousTag: string, packageName: string) => {
  return {
    // eslint-disable-next-line max-len
    'release-note': `Generating release note for \`${packageName}\` tag \`${currentTag}\`. Roll back version is \`${previousTag}\``,
    // eslint-disable-next-line max-len
    'release-dev': `Releasing \`${packageName}\` development environment \`${currentTag}\`. Roll back version is \`${previousTag}\``,
    // eslint-disable-next-line max-len
    'release-prod': `Releasing \`${packageName}\` production environment \`${currentTag}\`. Roll back version is \`${previousTag}\``,
  }
}

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.post('/release', async (req: Request, res: Response) => {
  const textFromSlack = req?.body?.event?.text || ''
  const textArray = textFromSlack.split(' ')
  const eventType = textArray?.[1]
  const packageName = textArray?.[2]
  if (!packageName) {
    sendMessageToSlack('You need to input the package want to release')
  }

  const currentTag = textArray?.[3]
  const previousTag = textArray?.[4]

  sendMessageToSlack(generateMessage(currentTag, previousTag, packageName)[eventType])
  const body = {
    event_type: eventType,
    client_payload: {
      package_name: packageName,
      current_tag: currentTag,
      previous_tag: previousTag,
    },
  }
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
  if (result.status === 204) {
    res.status(200)
    return res.send({ challenge: req.body.challenge, status: 200 })
  }
  sendMessageToSlack('Cannot run the command')
  return res.send({ challenge: req.body.challenge, status: 200 })
})

export const handler = async (event: APIGatewayProxyEvent, context: Context) => {
  return expressApp(event, context)
}
