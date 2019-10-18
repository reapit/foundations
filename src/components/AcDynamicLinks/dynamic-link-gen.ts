import { LoginMode } from '../../utils/cognito'

export enum DynamicAppConstants {
  DESKTOP_URL = 'agencycloud://'
}

export enum EntityType {
  CONTACT = 'contacts',
  PROPERTY = 'properties',
  TENNANCY = 'tennancies',
  APPLICANT = 'applicants',
  LANDLORD = 'landlords',
  PERSON = 'people',
  COMPANY = 'companies',
  APPS = 'apps'
}

export enum EntityParams {
  JOURNAL = 'Journal',
  LANDLORD = 'Landlord'
}

export enum AppParams {
  CODE = 'code',
  CONTACT_CODE = 'cntCode',
  TENNANT_ID = 'tenId'
}

export type SalesMode = 'Sales' | 'Lettings'

export interface DynamicLinkQueryParams {
  // These two are special queries as they relate to the app to return to and the requested
  // return param from the entity eg appParam=code when I have asked for a contact
  appId: string
  appPram: AppParams
  // Only used for launching an app by id
  id: string
  // Should I close the current app after navigation
  closeApp: boolean
  // These are for searching on entities eg property, tennancy, person, company etc
  address: string
  name: string
  communication: string
  mode: SalesMode
}

export interface DynamicLinkParams {
  appMode: LoginMode // Am I in desktop or web mode
  entityType: EntityType // What base desktop entity am I querying
  queryParams?: Partial<DynamicLinkQueryParams> // An object that will be deconstructed into a query string and appened if needed
  webRoute?: string // Where to route to in web mode if needed
  entityCode?: string // The id of the relevant entity I which to trigger eg contact or property
  entityParams?: EntityParams // Addtional url params specific to the entity
}

// Launches contact and wit parameter, it will close down the marketplace at the same time
export const genLaunchEntityLink = ({ entityCode }: DynamicLinkParams, entity?: EntityType): string | null =>
  entityCode && entity ? `${entity}/${entityCode}` : null

// Launches contact and wit parameter, it will close down the marketplace at the same time
export const genDynamicLink = ({ entityType, entityCode, queryParams, entityParams }: DynamicLinkParams): string => {
  const code = entityCode ? `/${entityCode}` : ''
  const params = entityParams ? `/${entityParams}` : ''
  const query = queryParamsToQueryString(queryParams)

  return `${DynamicAppConstants.DESKTOP_URL}${entityType}${code}${params}${query}`
}

export const queryParamsToQueryString = (queryParams: Partial<DynamicLinkQueryParams> = {}) =>
  Object.keys(queryParams)
    .reduce(
      (acc, current, index) => {
        const queryString = `${!index ? '?' : ''}${current}=${queryParams[current]}`
        acc.push(queryString)
        return acc
      },
      [] as string[]
    )
    .join('&')

export const getDynamicLink = (dynamicLinkParams: DynamicLinkParams): string | null => {
  const { appMode, webRoute } = dynamicLinkParams

  if (appMode === 'DESKTOP') {
    return genDynamicLink(dynamicLinkParams)
  }
  return webRoute || null
}

export const navigateDynamicApp = (dynamicLinkParams: DynamicLinkParams, navigateParentWindow?: Window): void => {
  const dynamicLink = getDynamicLink(dynamicLinkParams)

  if (navigateParentWindow && dynamicLink) {
    navigateParentWindow.postMessage({ dynamicLink }, navigateParentWindow.location.origin)
  } else if (dynamicLink) {
    window.location.href = dynamicLink
  }
}

// TODO - needs a test, just need to test in prod first, bit hacky
export const setMessageEventListener = () => {
  window.addEventListener('message', (event: MessageEvent) => {
    if (event.origin.startsWith('https://reapit.github.io')) {
      console.log('Reapit Dynamic Link Is', event.data)
      if (event.data.dynamicLink) {
        window.location.href = event.data.dynamicLink
      }
    }
  })
}
