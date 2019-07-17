import 'isomorphic-fetch'
import * as awsServerlessExpress from 'aws-serverless-express'
import { Context } from 'aws-lambda';
import server from './core/server'

(global as any).navigator = {}

const binaryMimeTypes = [
	'application/octet-stream',
	'font/eot',
	'font/opentype',
	'font/otf',
	'image/jpeg',
	'image/png',
	'image/svg+xml'
]

const app = awsServerlessExpress.createServer(server, () => null, binaryMimeTypes);
export const handler = (event: any, context: Context) => awsServerlessExpress.proxy(app, event, context)
