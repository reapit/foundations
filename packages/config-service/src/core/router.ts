import { Router } from 'express'

import { fetchConfig } from '../controllers/fetch-config'
import { createConfig } from '../controllers/create-config'
import { deleteConfig } from '../controllers/delete-config'

const router = Router()

router.get('/config/:configKey', fetchConfig)
router.post('/config', createConfig)
router.delete('/config/:configKey', deleteConfig)

export default router
