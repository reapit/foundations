import * as React from 'react'
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'
import '../../styles/vendor/swagger.scss'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { REAPIT_API_BASE_URL, URLS, MARKETPLACE_HEADERS } from '../../constants/api'
import Loader from '../ui/loader'
import { getAccessToken } from '../../utils/cognito'

const fetchInterceptor = async (params: RequestInit) => {
  return {
    ...params,
    headers: {
      ...MARKETPLACE_HEADERS,
      Authorization: `Bearer ${await getAccessToken()}`
    }
  }
}

const ApiDocsHome: React.SFC = () => {
  const [loading, setLoading] = React.useState(true)

  return (
    <ErrorBoundary>
      <div className="swagger">
        {loading && <Loader />}
        <div className={`${loading ? 'swagger-loading' : ''}`}>
          <SwaggerUI
            url={`${REAPIT_API_BASE_URL}${URLS.swagger}`}
            onComplete={() => setLoading(false)}
            requestInterceptor={fetchInterceptor}
          />
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default ApiDocsHome
