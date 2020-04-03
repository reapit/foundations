import { PropertyModel, PagedResultPropertyModel_ } from '@reapit/foundations-ts-definitions'

export type PickedPropertyModel = Pick<
  PropertyModel,
  'address' | 'bathrooms' | 'bedrooms' | 'id' | 'letting' | 'marketingMode' | 'selling' | 'style' | 'type'
>

export type PickedPagedResultPropertyModel_ = Omit<PagedResultPropertyModel_, '_embedded'> & {
  _embedded: PickedPropertyModel[]
}
