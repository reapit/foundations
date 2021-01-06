import { Router } from 'express'
import { checkSchema } from 'express-validator'

import { getStatusById } from '../controllers/event-status/get'
import { listStatuses } from '../controllers/event-status/list'
import { createEventStatus } from '../controllers/event-status/create'
import { updateStatusById } from '../controllers/event-status/update'

import { validateRequest } from '../middlewares/validate-request'
import { create } from '../validations/event-status'

const router = Router()

router.get('/event-status/:eventId', getStatusById)
router.get('/event-status', listStatuses)
router.post('/event-status', checkSchema(create), validateRequest, createEventStatus)
router.put('/event-status/:eventId', updateStatusById)

export default router
