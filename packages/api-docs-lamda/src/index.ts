import axios from 'axios'
import { createLogger } from '@reapit/node-utils'
// Path to the hosted docs app
export const API_DOCS_URL = 'https://foundations-documentation.reapit.cloud'

const logger = createLogger('api-docs-lambda')

export const apiDocsHandler = async () => {
  try {
    const response = await axios.get(API_DOCS_URL)
    return response.data
  } catch (error) {
    logger.error(error)
  }
}
