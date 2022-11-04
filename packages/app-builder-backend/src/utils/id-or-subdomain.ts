import * as uuid from 'uuid'
import { getDomainApps } from '../ddb'

export const idOrSubdomainToId = async (idOrSubdomain: string) => {
  if (uuid.validate(idOrSubdomain)) {
    return idOrSubdomain
  }
  const app = (await getDomainApps(idOrSubdomain))[0]
  return app?.id
}
