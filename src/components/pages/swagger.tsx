import * as React from 'react'
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'
import '../../styles/vendor/swagger.scss'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { URLS, MARKETPLACE_HEADERS, SWAGGER_BASE_URL } from '../../constants/api'
import { Loader } from '@reapit/elements'
import { getAccessToken } from '@/utils/session'

export const fetchInterceptor = async (params: RequestInit) => {
  return {
    ...params,
    headers: {
      ...MARKETPLACE_HEADERS,
      Authorization: `Bearer ${await getAccessToken()}`
    }
  }
}

export const handleOnComplete = setLoading => () => setLoading(false)

export const SwaggerPage: React.SFC = () => {
  const [loading, setLoading] = React.useState(true)

  return (
    <ErrorBoundary>
      <div className="swagger">
        {loading && <Loader />}
        <div className={`${loading ? 'swagger-loading' : ''}`}>
          <SwaggerUI
            url={`${SWAGGER_BASE_URL}${URLS.swagger}`}
            onComplete={handleOnComplete(setLoading)}
            requestInterceptor={fetchInterceptor}
          />
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default SwaggerPage
