import { Router, Response, Request } from 'express'
import { getAppointmentSlots } from '../api/get-appointment-slots'

const router = Router()

router.get('/appointment-slots', (req: Request, res: Response) => getAppointmentSlots(req, res))

export default router
