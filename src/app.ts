import * as awsServerlessExpress from 'aws-serverless-express'
import { Context } from 'aws-lambda';
import expressApp from './express'

const binaryMimeTypes = [
	'application/octet-stream',
	'font/eot',
	'font/opentype',
	'font/otf',
	'image/jpeg',
	'image/png',
	'image/svg+xml'
]

const app = awsServerlessExpress.createServer(expressApp, () => null, binaryMimeTypes);
export const handler = (event: any, context: Context) => awsServerlessExpress.proxy(app, event, context)
