import { PropertyImageModel, PagedResultPropertyImageModel_ } from '@reapit/foundations-ts-definitions'

export type PickedPropertyImageModel = Pick<PropertyImageModel, 'id' | 'url' | 'propertyId'>

export type PickedPagedResultPropertyImageModel_ = Omit<PagedResultPropertyImageModel_, '_embedded'> & {
  _embedded?: PickedPropertyImageModel[]
}
