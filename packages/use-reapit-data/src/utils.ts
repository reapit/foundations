import { ReapitConnectBrowserSession } from '@reapit/connect-session'
import { AxiosError } from 'axios'
import qs from 'qs'
import { GetAction } from './get-actions'
import { UpdateAction } from './update-actions'

export interface StringMap {
  [key: string]: string
}

export interface ReapitErrorField {
  field?: string
  message?: string
}

export interface ReapitError {
  statusCode?: number
  errors?: ReapitErrorField[]
  description?: string
  dateTime?: string
}

export const getMergedHeaders = async (
  reapitConnectBrowserSession: ReapitConnectBrowserSession,
  headers?: StringMap,
): Promise<StringMap | null> => {
  const connectSession = await reapitConnectBrowserSession.connectSession()
  const accessToken = connectSession?.accessToken

  return accessToken
    ? {
        Authorization: `Bearer ${accessToken}`,
        'api-version': 'latest',
        'Content-Type': 'application/json',
        ...headers,
      }
    : null
}

export const handleReapitError = (error: AxiosError<any>, defaultMessage?: string): string => {
  const { message } = error
  const reapitError: ReapitError = error?.response?.data
  const { description, errors } = reapitError ?? {}
  const messageString = description
    ? description
    : message
    ? message
    : defaultMessage
    ? defaultMessage
    : 'An unknown error has occurred, please refresh the page and try again.'
  const fieldErrors = errors?.map(({ field, message }) => `"${field}: ${message}"`)
  const fieldString = fieldErrors ? fieldErrors.join(', ') : ''

  return `${messageString} ${fieldString}`
}

export const getUrl = (action: GetAction | UpdateAction, queryParams?: Object, uriParams?: Object) => (): string => {
  const { api, path } = action
  const deSerialisedPath = uriParams
    ? Object.keys(uriParams).reduce<string>((path, uriReplaceKey) => {
        return path.replace(`{${uriReplaceKey}}`, uriParams[uriReplaceKey])
      }, path)
    : path
  const query = qs.stringify(queryParams, { encode: false })
  const url = `${api}${deSerialisedPath}${query ? `?${query}` : ''}`
  return url
}

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
export const objectToQuery = <QueryObjectType extends {}>(queryObject: QueryObjectType): StringMap =>
  Object.keys(queryObject).reduce((currentQuery: StringMap, nextItem: string) => {
    const objectItem = queryObject[nextItem]

    if (Array.isArray(objectItem)) {
      currentQuery[nextItem] = stringListToBatchQuery(objectItem, nextItem)
    } else if (objectItem) {
      currentQuery[nextItem] = String(objectItem)
    }

    return currentQuery
  }, {} as StringMap)
