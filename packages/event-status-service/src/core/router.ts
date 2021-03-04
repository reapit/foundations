import { Router } from 'express'
import { checkSchema } from 'express-validator'

import getStatusById from '../controllers/event-status/get'
import listStatuses from '../controllers/event-status/list'
import createEventStatus from '../controllers/event-status/create'
import updateStatusById from '../controllers/event-status/update'

import getAutomationById from '../controllers/automation/get'
import listAutomations from '../controllers/automation/list'
import createAutomation from '../controllers/automation/create'
import updateAutomationById from '../controllers/automation/update'
import deleteAutomationById from '../controllers/automation/delete'

import validateRequest from '../middlewares/validate-request'
import * as eventStatusValidation from '../validations/event-status'
import * as automationValidation from '../validations/automation'

const router = Router()

router.get('/event-status/:eventId', getStatusById)
router.get('/event-status', checkSchema(eventStatusValidation.list), validateRequest, listStatuses)
router.post('/event-status', checkSchema(eventStatusValidation.create), validateRequest, createEventStatus)
router.patch('/event-status/:eventId', checkSchema(eventStatusValidation.update), validateRequest, updateStatusById)

router.get('/automation/:id', getAutomationById)
router.get('/automation', checkSchema(automationValidation.list), validateRequest, listAutomations)
router.post('/automation', checkSchema(automationValidation.create), validateRequest, createAutomation)
router.patch('/automation/:id', checkSchema(automationValidation.update), validateRequest, updateAutomationById)
router.delete('/automation/:id', deleteAutomationById)

// router.post('/event', createEvent)
// router.get('/event', listEvents)

export default router
