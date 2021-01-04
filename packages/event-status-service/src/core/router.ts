import { Router } from 'express'
import { AppRequest, AppResponse } from '@reapit/node-utils'
import { getStatusById } from '../controllers/event-status/get'
import { listStatuses } from '../controllers/event-status/list'
import { createEventStatus } from '../controllers/event-status/create'
import { updateStatusById } from '../controllers/event-status/update'

const router = Router()

router.get('/event-status/:eventId', (req: AppRequest, res: AppResponse) => getStatusById(req, res))
router.get('/event-status', (req: AppRequest, res: AppResponse) => listStatuses(req, res))
router.post('/event-status', (req: AppRequest, res: AppResponse) => createEventStatus(req, res))
router.put('/event-status/:eventId', (req: AppRequest, res: AppResponse) => updateStatusById(req, res))

export default router
