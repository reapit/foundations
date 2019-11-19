enum errorStrings {
  NOT_FOUND = 'Resource not found',
  USERNAME_PASSWORD_REQUIRED = 'Bad request, both password and username are required',
  REFRESH_TOKEN_PASSWORD_REQUIRED = 'Bad request, both refresh token and username are required',
  AUTHENTICATION_FAILED = 'Bad request, user failed to authenticate',
  REFRESH_SESSION_FAILED = 'Bad request, failed to refresh session',
  CHANGE_PASSWORD_FAILED = 'Bad request, failed to change password',
  CONFIRM_PASSWORD_FAILED = 'Bad request, failed to confirm password change',
  USERNAME_PASSWORD_NEWPASSWORD_REQUIRED = 'Bad request, password, newPassword and username are required',
  USERNAME_CODE_NEWPASSWORD_REQUIRED = 'Bad request, verification code, USERNAME_CODE_NEWPASSWORD_REQUIRED and newPassword are required'
}

export default errorStrings
