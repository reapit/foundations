import { Response } from 'express'

const successHandler = (res: Response, status: number, response: Object) => {
  console.info(`SUCCESSFUL RESPONSE: ${status} ${JSON.stringify(response)}`)
  res.status(status)
  res.json(response)
  res.end()
}

export default successHandler
