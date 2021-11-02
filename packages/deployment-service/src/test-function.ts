import { httpHandler, } from '@homeservenow/serverless-aws-handler'
import { connect, logger } from './core'
import { defaultOutputHeaders } from './constants'
import { dbConfig } from './config/db'

export const testFunction = httpHandler<void, boolean>({
  defaultOutputHeaders,
  handler: async ({ event }) => {
    logger.info('handler called')
    logger.info('event', event)

    console.log('config', dbConfig)

    const connection = await connect()

    logger.info('connected to db', connection.isConnected)

    const result = await connection.runMigrations()

    console.log('migrations', result)

    return true
  },
})
