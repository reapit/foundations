import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { createSchema, CallBackendArguments } from 'swagger-to-graphql'
import { createPlatformAxiosInstance } from './axios'
import 'isomorphic-fetch'
import graphqlHeader from 'express-graphql-header'
import { API_VERSION } from './constants'

const handlePlatformCall = async ({
  context,
  requestOptions,
}: CallBackendArguments<Request>) => {
  if (!(context.headers as any).authorization) {
    return {
      statusCode: 401,
    }
  }

  const axios = createPlatformAxiosInstance()
  try {
    const result = await axios[requestOptions.method](requestOptions.path, {
      headers: {
        Authorization: (context.headers as any).authorization,
        API_VERSION,
      },
      body: requestOptions.body,
    })

    return result.data
  } catch (e: any) {
    console.error(e)
    return {
      error: e.message,
    }
  }
}

const bootstrap = async () => {
  const port = 4000

  console.log('Fetching swagger doc...')
  const swaggerResponse = await fetch(`${process.env.PLATFORM_API_BASE_URL}/docs/swagger/agencyCloud_swagger.json`)

  const swagger = await swaggerResponse.json()
  console.log('Starting GQL server')

  const schema = await createSchema({
    swaggerSchema: swagger as any,
    callBackend: handlePlatformCall,
  })
  const app = express()

  app.use(
    '/graphql',
    graphqlHeader,
    graphqlHTTP({
      schema,
      graphiql: true,
    }),
  )

  app.listen(port, () => console.log(`Running on port ${port}`))
}

bootstrap()
