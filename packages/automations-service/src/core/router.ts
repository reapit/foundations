import { Router } from 'express'
import { checkSchema } from 'express-validator'

import createConversation from '../controllers/conversation/create'
import fetchConversations from '../controllers/conversation/fetch'

import validateRequest from '../middlewares/validate-request'
import { create } from '../validations/conversation'

const router = Router()

router.post('/conversation', checkSchema(create), validateRequest, createConversation)
router.get('/conversation/fetch', fetchConversations)

export default router
