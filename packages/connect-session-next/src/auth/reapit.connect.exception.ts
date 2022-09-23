export class ReapitConnectException extends Error {
  constructor(reason: string) {
    super(`Reapit Connect Token Error: ${reason}`)
  }
}
