export interface ForgottenPasswordTemplateParams {
  verificationCode: string
  userName: string
  url: string
}

export interface ConfirmPasswordTemplateParams {
  userName: string
  url: string
}
