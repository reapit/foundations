import { Response } from 'express'
import { sendEmail } from '../core/ses-client'
import { AppRequest } from '@reapit/node-utils'

export const createPaymentRequest = async (req: AppRequest, res: Response) => {
  sendEmail(
    'hphillips@reapit.com',
    'Hi Holly',
    'This is the body of email',
    'This was sent from my payment request service, but from my Reapit Email. Pretty cool eh?, Will',
  )
  res.status(200)
  res.send('Email is sent!')
}
