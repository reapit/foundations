import server from './core/server'
import serverlessExpress from '@vendia/serverless-express'

export const app = serverlessExpress({ app: server })
