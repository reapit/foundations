import { Response } from 'express'
import { sendEmail } from '../core/ses-client'
import { AppRequest } from '@reapit/node-utils'
import ejs from 'ejs'
import { EmailPaymentRequest } from '../types/payments'

export const createPaymentRequestTemplate = async (data: EmailPaymentRequest) =>
  ejs.renderFile(`${__dirname}/templates/create-payment-request.ejs`, data)

export const createPaymentRequest = async (req: AppRequest, res: Response) => {
  const data: EmailPaymentRequest = req.body
  const clientInfo = process.env.CLIENTS
  console.log(clientInfo)

  const template = await createPaymentRequestTemplate(data)

  await sendEmail('hphillips@reapit.com', 'Hi Holly', template)
  res.status(200)
  res.end()
}
