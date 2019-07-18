enum errorStrings {
  NOT_FOUND = 'Resource not found',
  USERNAME_PASSWORD_REQUIRED = 'Bad request, both password and username are required',
  REFRESH_TOKEN_PASSWORD_REQUIRED = 'Bad request, both refresh token and username are required',
  AUTHENTICATION_FAILED = 'Bad request, user failed to authenticate',
  REFRESH_SESSION_FAILED = 'Bad request, failed to refresh session'
}

export default errorStrings
