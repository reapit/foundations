import { ForgottenPasswordTemplateParams, ConfirmPasswordTemplateParams } from './types'

export const forgotPasswordTemplate = ({ userName }: ForgottenPasswordTemplateParams) => `
<html>
  <div style="background-color:#f5f7f9; padding: 24px;">
    <article style="font-family: Helvetica, Arial, sans-serif;margin:0px auto;background-color:white;line-height: 1.5rem; max-width: 950px;">
      <img alt="Reapit Connect Logo" style="width: 50%; margin: 0 auto; padding: 16px; display: block;" src="https://web-components.prod.paas.reapit.cloud/reapit-connect.jpeg" />
      <h1 style="text-align: center;font-size: 24px; font-style: normal; padding:0 16px 24px 16px;">Reapit Connect - Forgotten Password</h1>
      <div style="padding:0 16px 16px 16px;">
        <p>Hi ${userName}</p>
        <p>We have received a request to reset your Reapit Connect password.</p>
        <p>Here is your single use verification code: {####}</p>
        <p>If you did not make this request, please ignore this email.</p>
        <p>Please do not reply to this email as this mailbox is not monitored. If you are a Reapit Customer and you are having an issue or if you have a question about Reapit Connect, please visit the Reapit Service Desk Portal.</p>
        <p>Best Regards,</p>
        <p>Reapit Team</p>
      </div>
    </article>
  </div>
</html>
`

export const confirmRegistrationTemplate = ({ url }: ConfirmPasswordTemplateParams) => `
<html>
  <div style="background-color:#f5f7f9; padding: 24px;">
    <article style="font-family: Helvetica, Arial, sans-serif;margin:0px auto;background-color:white;line-height: 1.5rem; max-width: 950px;">
      <img alt="Reapit Connect Logo" style="width: 50%; margin: 0 auto; padding: 16px; display: block;" src="https://web-components.prod.paas.reapit.cloud/reapit-connect.jpeg" />
      <h1 style="text-align: center;font-size: 24px; font-style: normal; padding:0 16px 24px 16px;">Welcome to Reapit Connect</h1>
      <div style="padding:0 16px 16px 16px;">
        <p>Hi {username},</p>
        <p>Welcome to Reapit Connect.</p>
        <p>Reapit Connect is our single sign on solution which allows you to seamlessly access products and services provided by Reapit Ltd.</p>
        <p>Please see below your username and verification code. When you click the verification link, you will be re-directed to a screen where you will be asked to change your password.</p>
        <div style="text-align: center;">
          <a style="border: solid thin #0061a8;padding: 10px;background-color: #0061a8;color: white;z-index: 1;text-decoration: none; font-style: normal;" href=${url}?userName={username}&verificationCode={####}>VERIFY ACCOUNT</a>
        </div>
        <p>Once your account has been verified, you will be redirected to the login page.</p>
        <p>Please do not reply to this email as this mailbox is not monitored. If you are a Reapit Customer and you are having an issue or if you have a question about Reapit Connect, please visit the Reapit Service Desk Portal.</p>
        <p>Best Regards,</p>
        <p>Reapit Team</p>
      </div>
    </article>
  </div>
</html>
`

export const adminUserInviteTemplate = ({ url }: ConfirmPasswordTemplateParams) => `
<html>
  <div style="background-color:#f5f7f9; padding: 24px;">
    <article style="font-family: Helvetica, Arial, sans-serif;margin:0px auto;background-color:white;line-height: 1.5rem; max-width: 950px;">
      <img alt="Reapit Connect Logo" style="width: 50%; margin: 0 auto; padding: 16px; display: block;" src="https://web-components.prod.paas.reapit.cloud/reapit-connect.jpeg" />
      <h1 style="text-align: center;font-size: 24px; font-style: normal; padding:0 16px 24px 16px;">Welcome to Reapit Connect</h1>
      <div style="padding:0 16px 16px 16px;">
        <p>Hi {username},</p>
        <p>Welcome to Reapit Connect.</p>
        <p>Reapit Connect is our single sign on solution which allows you to seamlessly access products and services provided by Reapit Ltd.</p>
        <p>Please see below your username and temporary password. When you click the login link, you will be re-directed to a screen where you will be asked to change your password.</p>
        <p><strong>User Name: {username}</strong></p>
        <p><strong>Password: {####}</strong></p>
        <div style="text-align: left;">
          <a style="border: solid thin #0061a8;padding: 10px;background-color: #0061a8;color: white;z-index: 1;text-decoration: none; font-style: normal;" href=${url}>LOGIN</a>
        </div>
        <p>When you have successfully changed your password, you will then be presented with a list of products and services available to you.</p>
        <p>Please do not reply to this email as this mailbox is not monitored. If you are a Reapit Customer and you are having an issue or if you have a question about Reapit Connect, please visit the Reapit Service Desk Portal.</p>
        <p>Best Regards,</p>
        <p>Reapit Team</p>
      </div>
    </article>
  </div>
</html>
`
