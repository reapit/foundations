import { useParams, useLocation, useHistory } from 'react-router'
import qs from 'query-string'

export const getAppId = (): string => {
  const parts = window.location.pathname.split('/')
  const numParts = parts.length
  const appId = parts[1]
  const subdomain = window.location.hostname.split('.')[0]
  return numParts === 3 ? appId : subdomain
}

export const isOnSubdomain = (appId?: string): boolean => {
  if (!appId) {
    return false
  }
  // is valid uuid v4 using regex
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(appId)
  return !isUuid
}

export const usePageId = () => {
  const { pageId } = useParams<{ pageId?: string }>()
  let { appId } = useParams<{ appId?: string }>()
  if (!appId) {
    appId = window?.location?.hostname?.split('.')[0]
  }
  const location = useLocation()
  const context = qs.parse(location.search)
  const history = useHistory()

  const generateLinkAttrs = (pageId: string, context?: any) => {
    const path = [isOnSubdomain(appId) ? '' : appId, pageId === '~' ? '' : pageId].filter(Boolean).join('/')
    // make first character / if it isn't already
    const pathname = path.charAt(0) === '/' ? path : `/${path}`
    return {
      pathname,
      search: qs.stringify(context),
    }
  }

  const setPageId = (pageId: string, context?: Record<string, any>, forceRefresh?: boolean) => {
    const { pathname, search } = generateLinkAttrs(pageId, context)
    const dest = `${pathname}${search ? `?${search}` : ''}`
    history.push(dest)
    if (forceRefresh) {
      window.location.reload()
    }
  }

  return { pageId: pageId || '~', setPageId, appId, context, generateLinkAttrs }
}

export const getPageId = () => {
  const parts = window.location.pathname.split('/').filter(Boolean)
  const pageId = parts[1] || '~'
  const appId = parts[0]

  return { pageId, appId }
}
