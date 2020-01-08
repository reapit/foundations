import { sampleApp } from '../requests/app'

export type LinkModel = {
  rel: string
  href: string
  action: string
}

export type MediaModel = {
  id: string
  uri: string
  description: string
  type: string
  order: number
  links: LinkModel[]
}

export type CategoryModel = {
  id: string
  name: string
  description: string
  links: LinkModel[]
}

export type AppDetailModel = typeof sampleApp & { media: MediaModel[]; category: CategoryModel }
export type CreateAppRevisionModel = typeof sampleApp & { isListed: boolean }
