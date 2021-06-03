export class ApiKeyNotFoundException extends Error {
  constructor() {
    super('Api Key not found')
  }
}
