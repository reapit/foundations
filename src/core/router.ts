import { Router, Response, Request } from 'express'
import { loginUserApi } from '../api/session/login-user-session'
import { refreshUserSessionApi } from '../api/session/refresh-user-session'
import { changePasswordApi } from '../api/password/change-password'
import errorStrings from '../constants/error-strings'
import errorHandler from '../utils/error-handler'

const router = Router()

router.post('/login', (req, res) => loginUserApi(req, res))
router.post('/refresh', (req, res) => refreshUserSessionApi(req, res))
router.post('/password/change', (req, res) => changePasswordApi(req, res))
router.post('/password/reset', (req, res) => changePasswordApi(req, res))
router.post('/password/confirm', (req, res) => changePasswordApi(req, res))
router.use((err: Error, _req: Request, res: Response) => {
  console.error(errorStrings.NOT_FOUND, JSON.stringify(err))
  errorHandler(res, 404, errorStrings.NOT_FOUND, err)
})

export default router
