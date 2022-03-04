import { CustomEntity } from './entities/custom-entity'

export type Context = {
  accessToken: string
  idToken: string
  apiUrl: string
  customEntities: CustomEntity[]
  appId?: string
}
