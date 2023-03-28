export const TOKEN_PROVIDER_INJECTABLE = 'TOKEN_PROVIDER_INJECTABLE'

export const CredAuthTokenProvider = (priority: number) => (target) => {
  Reflect.defineMetadata(TOKEN_PROVIDER_INJECTABLE, priority, target)
}
