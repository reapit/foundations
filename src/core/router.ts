import { Router, Response, Request } from 'express'
import { loginApi } from '../api/login'
import { refreshApi } from '../api/refresh'
import errorHandler from '../utils/error-handler'
import errorStrings from '../constants/error-strings'

const router = Router()

router.post('/login', (req, res) => loginApi(req, res))
router.post('/refresh', (req, res) => refreshApi(req, res))
router.use((err: Error, _req: Request, res: Response) => {
  console.error(errorStrings.NOT_FOUND, JSON.stringify(err))
  errorHandler(res, 404, errorStrings.NOT_FOUND, err)
})

export default router
