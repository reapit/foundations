import { HttpErrorException } from '@homeservenow/serverless-aws-handler'

export class ConflictException extends HttpErrorException {
  constructor(message?: string) {
    super(message || 'Conflict', 409)
  }
}
