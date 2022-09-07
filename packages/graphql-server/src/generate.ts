import swagger from '../example.json'
import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { createSchema, CallBackendArguments } from 'swagger-to-graphql'
import { createPlatformAxiosInstance } from './utils/axios-instances'

const handlePlatformCall = async ({
  context,
  requestOptions,
}: CallBackendArguments<Request>) => {
  if (!(context.headers as any).authorization) {
    return {
      statusCode: 401,
    }
  }
  process.env.PLATFORM_API_BASE_URL = 'https://platform.dev.paas.reapit.cloud'

  const axios = createPlatformAxiosInstance()
  try {
    const result = await axios[requestOptions.method](requestOptions.path, {
      headers: {
        Authorization: (context.headers as any).authorization,
        'api-version': '2020-01-31',
      },
      body: requestOptions.body,
    })

    return result.data
  } catch (e) {

    console.error(e)
    return {
      error: e.message,
    }
  }
}

const bootstrap = async () => {
  const schema = await createSchema({
    swaggerSchema: swagger as any,
    callBackend: handlePlatformCall,
  })
  const app = express()

  app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
  }))
  
  app.listen(4000, () => console.log('running')) 
}

bootstrap()
