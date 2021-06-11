import { getByKey } from '@/services'
import { ownership } from '@/utils'
import { resolveDeveloperId } from './../utils'
import { httpHandler, HttpStatusCode, NotFoundException } from '@homeservenow/serverless-aws-handler'
import { execSync } from 'child_process'
import { resolve } from 'path'
import { defaultOutputHeaders } from './../constants'

const cloneDir = 'project'
const dir = resolve('/tmp')

export const deployRun = httpHandler({
  defaultOutputHeaders,
  defaultStatusCode: HttpStatusCode.OK,
  handler: async ({ event }) => {
    const developerId = await resolveDeveloperId(event)

    const deployment = await getByKey(event.pathParameters?.id as string)

    if (!deployment) {
      throw new NotFoundException()
    }

    await ownership(deployment.developerId, developerId)

    if (!deployment.repository) {
      throw new Error('No repository set')
    }

    try {
      console.log('hello! cloning now with simple-git')
      const clone = await execSync(`curl -o ${cloneDir} -s -O ${deployment.repository}`)
      console.log('clone', clone.toString())
    } catch (e) {
      // console.error(e)
      console.log('message', e.message)
      console.log('clone failed')
      return {
        statusCode: 500,
        headers: defaultOutputHeaders,
      }
    }

    try {
      const yarn = execSync('npm i', {
        cwd: resolve(dir, cloneDir),
      })
      console.log('yarn', yarn.toString())
    } catch (e) {
      console.log(e.output.toString())
      console.log('yarn errors')
      console.error(e)
      console.log('npm install failed')
      return {
        statusCode: 500,
        headers: defaultOutputHeaders,
      }
    }

    try {
      const yarn = execSync('npm run build', {
        cwd: resolve(dir, cloneDir),
      })
      console.log('yarn build', yarn.toString())
    } catch (e) {
      console.log('yarn build errors')
      console.error(e)
      console.log('npm build failed')
      return {
        statusCode: 500,
        headers: defaultOutputHeaders,
      }
    }

    try {
      const serverless = execSync('serverless deploy', {
        cwd: resolve(dir, cloneDir),
      })
      console.log('serverless', serverless.toString())
    } catch (e) {
      console.log('sefverless error')
      console.error(e)

      return {
        statusCode: 500,
        headers: defaultOutputHeaders,
      }
    }

    return {
      statusCode: HttpStatusCode.OK,
    }
  },
})
