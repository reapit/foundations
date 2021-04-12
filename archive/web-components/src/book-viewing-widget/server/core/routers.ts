import { Router, Response, Request } from 'express'

import { createGetAppointmentSlotsFn } from '../../../common/api/get-appointment-slots'
import { logger } from './logger'
import { ping } from '../api/ping'
import { PACKAGE_SUFFIXES } from '../../../common/utils/constants'

const router = Router()

router.get('/appointment-slots', createGetAppointmentSlotsFn(logger, PACKAGE_SUFFIXES.BOOK_A_VIEWING))
router.get('/ping', (req: Request, res: Response) => ping(req, res))

export default router
