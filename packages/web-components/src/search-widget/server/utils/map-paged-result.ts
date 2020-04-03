import pickBy from 'lodash.pickby'
import { PagedResultPropertyModel_ } from '@reapit/foundations-ts-definitions'
import { PickedPagedResultPropertyModel_ } from '../../types'

type OptionalObject = { [key?: string]: any }

export type PagedResult = { _embedded?: OptionalObject[]; [other?: string]: any }

export const mappingMinimalProperties = (fullPagedResult: PagedResult, includedEmbeddedProps: string[]) => {
  // const includedProps = ['address', 'bathrooms', 'bedrooms', 'id', 'letting', 'marketingMode', 'selling', 'style', 'type']
  const pickedEmbeded: OptionalObject = fullPagedResult._embedded?.map(obj =>
    pickBy(obj, (value, key) => includedEmbeddedProps.includes(key)),
  )
    return {
      _embedded:
    }
}
