import pickBy from 'lodash.pickby'
import { PagedResultPropertyModel_, PagedResultPropertyImageModel_ } from '@reapit/foundations-ts-definitions'
import {
  PickedPagedResultPropertyModel_,
  PickedPagedResultPropertyImageModel_,
  PickedPropertyModel,
  PickedPropertyImageModel,
} from '../../types'

type InputObject = PagedResultPropertyModel_ | PagedResultPropertyImageModel_
type PickedModel = PickedPropertyModel | PickedPropertyImageModel
type OutputObject = PickedPagedResultPropertyModel_ | PickedPagedResultPropertyImageModel_

/**
 * Map through to return only necessary properties
 */
export const mapMinimalProperties = (
  { _embedded, ...rest }: InputObject,
  includedEmbeddedProps: string[],
): OutputObject => {
  if (!_embedded) {
    return {
      ...rest,
      _embedded,
    }
  }
  const pickedEmbedded = (_embedded as PickedModel[]).map(obj =>
    pickBy(obj, (value, key) => includedEmbeddedProps.includes(key)),
  )
  return {
    ...rest,
    _embedded: pickedEmbedded,
  }
}
