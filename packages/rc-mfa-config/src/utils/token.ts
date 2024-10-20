export const tokenFromCognito = (token: string) => getTokenIssuer(token)?.includes('cognito') ?? false

export const getTokenIssuer = (token: string) => {
  const decoded = JSON.parse(atob(token.split('.')[1]))
  return decoded?.iss ?? ''
}
