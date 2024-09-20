export const tokenFromCognito = (token: string) => getTokenIssuer(token)?.includes('cognito') ?? false

export const getTokenIssuer = (token: string) => {
  if (!token) return ''

  const decoded = JSON.parse(atob(token.split('.')[1]))
  return decoded?.iss ?? ''
}
