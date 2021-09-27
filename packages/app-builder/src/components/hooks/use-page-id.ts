import { useHistory, useParams, useLocation } from 'react-router'
import qs from 'query-string'

export const usePageId = () => {
  const { pageId } = useParams<{ pageId?: string }>()
  let { appId } = useParams<{ appId?: string }>()
  if (!appId) {
    appId = window.location.hostname.split('.')[0]
  }
  const location = useLocation()
  const context = qs.parse(location.search)
  const history = useHistory()
  const setPageId = (pageId: string, context?: { [key: string]: string }) => {
    history.push(`/${appId}${pageId === '~' ? '' : `/${pageId}`}${context ? `?${qs.stringify(context)}` : ''}`)
  }

  return { pageId: pageId || '~', setPageId, appId, context }
}

export const getPageId = () => {
  const parts = window.location.pathname.split('/').filter(Boolean)
  const pageId = parts[1] || '~'
  const appId = parts[0]

  return { pageId, appId }
}
