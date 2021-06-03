export class ApiKeyExpiredException extends Error {
  constructor() {
    super('Api Key expired')
  }
}
