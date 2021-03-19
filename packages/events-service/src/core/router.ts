import { Router } from 'express'
import { checkSchema } from 'express-validator'

import getStatusById from '../controllers/event-status/get'
import listStatuses from '../controllers/event-status/list'
import createEventStatus from '../controllers/event-status/create'
import updateStatusById from '../controllers/event-status/update'
import upsertEventStatus from '../controllers/event-status/upsert'

import getAutomationById from '../controllers/automation/get'
import listAutomations from '../controllers/automation/list'
import createAutomation from '../controllers/automation/create'
import updateAutomationById from '../controllers/automation/update'
import deleteAutomationById from '../controllers/automation/delete'

import createEvent from '../controllers/event/create'
import listEvents from '../controllers/event/list'

import validateRequest from '../middlewares/validate-request'
import * as eventStatusValidation from '../validations/event-status'
import * as automationValidation from '../validations/automation'
import * as eventValidation from '../validations/event'

const router = Router()

// NOTE: we don't strictly need all these endpoints
// the only one actually in use by the un-crm front end now
// is PUT /event-status which is used for dismissing events and updating
// their status or ceeating a new event-status if one doesn't already exist
router.get('/event-status/:eventId', getStatusById)
router.get('/event-status', checkSchema(eventStatusValidation.list), validateRequest, listStatuses)
router.post('/event-status', checkSchema(eventStatusValidation.create), validateRequest, createEventStatus)
router.put('/event-status', checkSchema(eventStatusValidation.create), validateRequest, upsertEventStatus)
router.patch('/event-status/:eventId', checkSchema(eventStatusValidation.update), validateRequest, updateStatusById)

router.get('/automation/:id', getAutomationById)
router.get('/automation', checkSchema(automationValidation.list), validateRequest, listAutomations)
router.post('/automation', checkSchema(automationValidation.create), validateRequest, createAutomation)
router.patch('/automation/:id', checkSchema(automationValidation.update), validateRequest, updateAutomationById)
router.delete('/automation/:id', deleteAutomationById)

// TODO: add validation on the create endpoint when we know what the exact event type is
router.post('/event', createEvent)
router.get('/event', checkSchema(eventValidation.list), validateRequest, listEvents)

export default router
