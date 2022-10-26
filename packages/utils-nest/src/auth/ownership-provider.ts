import { Injectable, ForbiddenException, Global } from '@nestjs/common'

@Global()
@Injectable()
export class OwnershipProvider {
  check<T extends { developerId?: string }>(entity: T, developerId: string): void | never {
    if (!entity.developerId || entity.developerId !== developerId) {
      throw new ForbiddenException()
    }
  }
}
