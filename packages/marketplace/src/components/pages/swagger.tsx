import * as React from 'react'
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'
import '../../styles/vendor/swagger.scss'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { Loader } from '@reapit/elements'
import { SandboxPopUp } from '../ui/sandbox-pop-up'

export const handleOnComplete = setLoading => () => setLoading(false)

export const SwaggerPage: React.SFC = () => {
  const [loading, setLoading] = React.useState(true)

  return (
    <ErrorBoundary>
      <div className="swagger">
        {loading && <Loader />}
        <div className={`${loading ? 'swagger-loading' : ''}`}>
          <SwaggerUI url={process.env.SWAGGER_BASE_URL} onComplete={handleOnComplete(setLoading)} docExpansion="none" />
        </div>
        <SandboxPopUp loading={loading} />
      </div>
    </ErrorBoundary>
  )
}

export default SwaggerPage
