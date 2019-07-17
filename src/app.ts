import * as awsServerlessExpress from 'aws-serverless-express'
import { Context } from 'aws-lambda';
import router from './core/router'

const binaryMimeTypes = [
	'application/octet-stream',
	'font/eot',
	'font/opentype',
	'font/otf',
	'image/jpeg',
	'image/png',
	'image/svg+xml'
]

const app = awsServerlessExpress.createServer(router, () => null, binaryMimeTypes);
export const handler = (event: any, context: Context) => awsServerlessExpress.proxy(app, event, context)
