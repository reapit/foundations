import { Request, Response } from 'express'

export const getAppointmentSlots = async (req: Request, res: Response) => {
  res.status(200)
  res.end()
}
