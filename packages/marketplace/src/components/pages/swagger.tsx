import * as React from 'react'
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'
import '../../styles/vendor/swagger.scss'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { Loader } from '@reapit/elements'
import { SandboxPopUp } from '../ui/sandbox-pop-up'
import { getAccessToken } from '@/utils/session'
import { StringMap } from '../../types/core'

export type InterceptorParams = {
  url: string
  headers: StringMap
}

export const handleOnComplete = setLoading => () => setLoading(false)

export const fetchAccessToken = async (setAccessToken: React.Dispatch<React.SetStateAction<null | string>>) => {
  const fetchedAccessToken = await getAccessToken()
  setAccessToken(fetchedAccessToken)
}

export const fetchInterceptor = (params: InterceptorParams, accessToken: string | null) => {
  if (params.url === process.env.SWAGGER_BASE_URL) {
    return params
  }

  return {
    ...params,
    headers: {
      ...params.headers,
      'api-version': 'latest',
      Authorization: `Bearer ${accessToken}`,
    },
  }
}

export const SwaggerPage: React.SFC = () => {
  const [loading, setLoading] = React.useState(true)
  const [accessToken, setAccessToken] = React.useState()
  const requestInterceptor = (params: InterceptorParams) => fetchInterceptor(params, accessToken)

  React.useEffect(() => {
    fetchAccessToken(setAccessToken)
  })

  return (
    <ErrorBoundary>
      <div className="swagger">
        {(loading || !accessToken) && <Loader />}
        <div className={`${loading ? 'swagger-loading' : ''}`}>
          <SwaggerUI
            url={process.env.SWAGGER_BASE_URL}
            onComplete={handleOnComplete(setLoading)}
            docExpansion="none"
            requestInterceptor={requestInterceptor}
          />
        </div>

        <SandboxPopUp loading={loading} />
      </div>
    </ErrorBoundary>
  )
}

export default SwaggerPage
