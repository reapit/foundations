import axios from 'axios'
// Path to the hosted docs app
export const API_DOCS_URL = 'https://foundations-documentation.reapit.cloud'
// List of domains I allow to load in an iframe
export const CONTENT_SECURITY_WHITELIST =
  'http://localhost:8080 https://marketplace.reapit.cloud https://dev.marketplace.reapit.cloud https://dev.developers.reapit.cloud https://developers.reapit.cloud'

export const apiDocsHandler = async () => {
  try {
    const response = await axios.get(API_DOCS_URL)
    return {
      statusCode: 200,
      headers: {
        ...response.headers,
        'Content-Security-Policy': `frame-ancestors 'self' ${CONTENT_SECURITY_WHITELIST}`,
      },
      body: response.data,
    }
  } catch (error) {
    console.error(error)
  }
}
