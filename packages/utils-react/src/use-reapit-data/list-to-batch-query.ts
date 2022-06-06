/** Util for useReapitGet queryParams to handle batch ids
 *
 * Problem: useReapitGet generates a query from an object so dupicate keys are not possible. The API sometimes requires
 * us to use multiple queries of the same key eg ?foo=bar&foo=baz&foo=bat
 *
 * This util takes a given list and outputs as a string that can be used as the value in a useReapitGet queryParams call
 * Usage: 
 * 
  const [trafficEvents] = useReapitGet<TrafficEventsModel>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getTrafficStats],
    queryParams: {
      appId: listToBatchQuery<AppSummaryModel>(apps, 'id', 'appId')
    },
    fetchWhenTrue: [dateFrom, dateTo],
  })

   listToBatchQuery<AppSummaryModel>(apps, 'id', 'appId') === MOCK_ID1&appId=MOCK_ID2&appId=MOCK_ID3
 * 
 */

import { StringMap } from '@reapit/utils-common'

export const listToBatchQuery = <ListType>(list: ListType[], listKey: keyof ListType, queryKey: string): string =>
  list.reduce((query: string, nextItem: ListType, index: number) => {
    const listValue = String(nextItem[listKey])
    if (!index) {
      return listValue
    }
    return `${query}&${queryKey}=${listValue}`
  }, '')

// Same principle for this function but where your list is an array of strings or numbers
export const stringListToBatchQuery = (list: (string | number)[], queryKey: string): string =>
  list.reduce((query: string, nextItem: string | number, index: number) => {
    if (!index) {
      return String(nextItem)
    }
    return `${query}&${queryKey}=${nextItem}`
  }, '')

// And again where you have an object of filters with a mixture of arrays and strings / boolean / numeric values and
// you need a string map returned for useReapitGet
export const objectToQuery = <QueryObjectType>(queryObject: QueryObjectType): StringMap =>
  Object.keys(queryObject).reduce((currentQuery: StringMap, nextItem: string) => {
    const objectItem = queryObject[nextItem]

    if (Array.isArray(objectItem)) {
      currentQuery[nextItem] = stringListToBatchQuery(objectItem, nextItem)
    } else {
      currentQuery[nextItem] = String(objectItem)
    }

    return currentQuery
  }, {} as StringMap)
