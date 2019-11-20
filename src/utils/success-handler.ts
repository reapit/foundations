import { Response } from 'express'

const successHandler = (res: Response, status: number, url: string, response: Object) => {
  console.info(`SUCCESSFUL RESPONSE: ${status} ${url}`)
  res.status(status)
  res.json(response)
  res.end()
}

export default successHandler
