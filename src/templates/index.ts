import ejs from 'ejs'
import { ForgottenPasswordTemplateParams } from './types'

export const forgotPasswordTemplate = async (data: ForgottenPasswordTemplateParams) =>
  ejs.renderFile(`${__dirname}/ejs/forgotten-password.ejs`, data)
