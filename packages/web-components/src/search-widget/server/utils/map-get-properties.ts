import { PagedResultPropertyModel_ } from '@reapit/foundations-ts-definitions'
import { PickedPagedResultPropertyModel_ } from '../../types'

export const mappingMinimalProperties = (
  fullPagedResult: PagedResultPropertyModel_,
): PickedPagedResultPropertyModel_ => {
  const includedProps = ['address', 'bathrooms', 'bedrooms', 'id', 'letting', 'marketingMode', 'selling', 'style', 'type']

  const pickedEmbedded =
}
