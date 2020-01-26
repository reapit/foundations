import ejs from 'ejs'
import { ForgottenPasswordTemplateParams, ConfirmPasswordTemplateParams } from './types'

export const forgotPasswordTemplate = async (data: ForgottenPasswordTemplateParams) =>
  ejs.renderFile(`${__dirname}/ejs/forgotten-password.ejs`, data)

export const confirmRegistrationTemplate = async (data: ConfirmPasswordTemplateParams) =>
  ejs.renderFile(`${__dirname}/ejs/confirm-registration.ejs`, data)
