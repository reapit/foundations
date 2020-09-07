import { Router, Response, Request } from 'express'
/*
 * TODOME(bookViewing)
 * point to correct api0
 */

import { createGetAppointmentSlotsFn } from '../../../common/api/get-appointment-slots'
import { logger } from '../core/logger'
import { ping } from '../api/ping'

const router = Router()

router.get('/appointment-slots', createGetAppointmentSlotsFn(logger))
router.get('/ping', (req: Request, res: Response) => ping(req, res))

export default router
