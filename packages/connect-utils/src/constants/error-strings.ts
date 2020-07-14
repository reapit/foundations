enum errorStrings {
  NOT_FOUND = 'Resource not found',
  USERNAME_PASSWORD_REQUIRED = 'Bad request, both password and username are required',
  REFRESH_TOKEN_PASSWORD_REQUIRED = 'Bad request, either a refresh token and username or an' +
    ' authorisation code and redirect uri are required',
  AUTHENTICATION_FAILED = 'Bad request, user failed to authenticate',
  REFRESH_SESSION_FAILED = 'Bad request, failed to refresh session',
  CHANGE_PASSWORD_FAILED = 'Bad request, failed to change password',
  CONFIRM_PASSWORD_FAILED = 'Bad request, failed to confirm password change',
  RESET_PASSWORD_FAILED = 'Bad request, failed to reset password',
  USERNAME_PASSWORD_NEWPASSWORD_REQUIRED = 'Bad request, password, newPassword and username are required',
  USERNAME_CODE_NEWPASSWORD_REQUIRED = 'Bad request, verification code, username and newPassword are required',
  USERNAME_REQUIRED = 'Bad request, username is required',
  LOGIN_SESSION_SERVICE_ERROR = 'Bad request, loginUserSessionService faild to authenticate',
  TOKEN_REFRESH_SESSION_SERVICE_ERROR = 'Bad request, tokenRefreshUserSessionService failed to authenticate',
  CODE_REFRESH_SESSION_SERVICE_ERROR = 'Bad request, codeRefreshUserSessionService failed to authenticate',
  CHANGE_PASSWORD_SERVICE_ERROR = 'Bad request, change password service failed',
  RESET_PASSWORD_SERVICE_ERROR = 'Bad request, reset password service failed',
  CONFIRM_PASSWORD_SERVICE_ERROR = 'Bad request, confirm password service failed',
  CONFIRM_REGISTRATION_SERVICE_ERROR = 'Bad request, confirm registration service failed',
  CONFIRM_REGISTRATION_FAILED = 'Bad request, failed to confirm registration',
  USERNAME_CODE_REQUIRED = 'Bad request, verification code and username are required',
}

export default errorStrings
