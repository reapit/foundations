import { Router } from 'express'
import { loginUserSessionApi } from '../api/session/login-user-session'
import { refreshUserSessionApi } from '../api/session/refresh-user-session'
import { changePasswordApi } from '../api/password/change-password'
import { resetPasswordApi } from '../api/password/reset-password'
import { confirmPasswordApi } from '../api/password/confirm-password'
import { confirmRegistrationApi } from '../api/registration/confirm-registration'

const router = Router()

router.post('/login', (req, res) => loginUserSessionApi(req, res))
router.post('/refresh', (req, res) => refreshUserSessionApi(req, res))
router.post('/registration/confirm', (req, res) => confirmRegistrationApi(req, res))
router.post('/password/change', (req, res) => changePasswordApi(req, res))
router.post('/password/reset', (req, res) => resetPasswordApi(req, res))
router.post('/password/confirm', (req, res) => confirmPasswordApi(req, res))

export default router
