import { Router, Response, Request } from 'express'

import { createGetAppointmentSlotsFn } from '../../../common/api/get-appointment-slots'
import { ping } from '../api/ping'
import { logger } from '../core/logger'
import { PACKAGE_SUFFIXES } from '../../../common/utils/constants'

const router = Router()

router.get('/appointment-slots', createGetAppointmentSlotsFn(logger, PACKAGE_SUFFIXES.BOOK_A_VALUATION))
router.get('/ping', (req: Request, res: Response) => ping(req, res))

export default router
