export const tokenFromCognito = (token: string) => {
  const decoded = JSON.parse(atob(token.split('.')[1]))
  return decoded?.iss?.includes('cognito') ?? false
}
