import { useParams, useLocation } from 'react-router'
import qs from 'query-string'

export const getAppId = (): string => {
  const parts = window.location.pathname.split('/')
  const numParts = parts.length
  const appId = parts[1]
  const subdomain = window.location.hostname.split('.')[0]
  return numParts === 3 ? appId : subdomain
}

export const usePageId = () => {
  const { pageId } = useParams<{ pageId?: string }>()
  let { appId } = useParams<{ appId?: string }>()
  if (!appId) {
    appId = window?.location?.hostname?.split('.')[0]
  }
  const location = useLocation()
  const context = qs.parse(location.search)
  // const history = useHistory()

  const generateLinkAttrs = (pageId: string, context?: any) => ({
    pathname: `/${appId}${pageId === '~' ? '' : `/${pageId}`}`,
    search: qs.stringify(context),
  })

  const setPageId = (pageId: string, context?: Record<string, any>) => {
    const { pathname, search } = generateLinkAttrs(pageId, context)
    const dest = `${pathname}${search ? `?${search}` : ''}`
    window.location.pathname = dest
  }

  return { pageId: pageId || '~', setPageId, appId, context, generateLinkAttrs }
}

export const getPageId = () => {
  const parts = window.location.pathname.split('/').filter(Boolean)
  const pageId = parts[1] || '~'
  const appId = parts[0]

  return { pageId, appId }
}
