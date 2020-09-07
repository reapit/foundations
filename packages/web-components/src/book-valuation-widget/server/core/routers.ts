import { Router, Response, Request } from 'express'

import { createGetAppointmentSlotsFn } from '../../../common/api/get-appointment-slots'
import { ping } from '../api/ping'
import { logger } from '../core/logger'

const router = Router()

router.get('/appointment-slots', createGetAppointmentSlotsFn(logger))
router.get('/ping', (req: Request, res: Response) => ping(req, res))

export default router
