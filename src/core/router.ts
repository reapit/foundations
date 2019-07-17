import { Router } from 'express'
import { loginApi } from '../api/login'
import { refreshApi } from '../api/refresh'
import { handle404 } from '../utils/error-handler'

const router = Router()

router.post('/login', (req, res) => loginApi(req, res))
router.post('/refresh',  (req, res) => refreshApi(req, res))
router.use(handle404)

export default router
