import { useHistory, useParams, useLocation } from 'react-router'
import qs from 'query-string'

export const usePageId = () => {
  const { pageId } = useParams<{ pageId?: string }>()
  const location = useLocation()
  const context = qs.parse(location.search)
  const history = useHistory()
  const setPageId = (pageId: string, context?: { [key: string]: string }) => {
    history.push(`/${pageId}${context ? `?${qs.stringify(context)}` : ''}`)
  }

  return { pageId, setPageId, context }
}
