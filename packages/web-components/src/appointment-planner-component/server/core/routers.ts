import { Router, Response, Request } from 'express'
import { getAppointmentSlots } from '../api/get-appointment-slots'
import { ping } from '../api/ping'

const router = Router()

router.get('/appointment-slots', (req: Request, res: Response) => getAppointmentSlots(req, res))
router.get('/ping', (req: Request, res: Response) => ping(req, res))

export default router
