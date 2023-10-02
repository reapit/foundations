import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'
import { swagger, swaggerHidden } from './__styles__/swagger'
import ErrorBoundary from '../../core/error-boundary'
import { Loader, Title, BodyText, PersistentNotification } from '@reapit/elements'
import { cx } from '@linaria/core'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'

interface StringMap {
  [key: string]: string
}

export type InterceptorParams = {
  url: string
  headers: StringMap
}

export type InterceptorResponse = {
  url: string
  ok: boolean
  text: Blob
}

export interface SwaggerPageProps {
  swaggerUri: string | null
}

export const handleOnComplete = (setLoading: Dispatch<SetStateAction<boolean>>) => () => {
  setLoading(false)
}

export const fetchInterceptor = (params: InterceptorParams, accessToken?: string | null) => {
  if (!accessToken) {
    return
  }

  return {
    ...params,
    headers: {
      ...params.headers,
      'api-version': '2020-01-31',
      Authorization: `Bearer ${accessToken}`,
    },
  }
}

export const responseInterceptor = (response: InterceptorResponse) => {
  if (response.url.includes('download') && response.ok) {
    const url = window.URL.createObjectURL(response.text)
    window.open(url, '_blank')
    return response.ok
  }
  return response
}

export const handleSandboxTimeout = (setSandboxVisible: Dispatch<SetStateAction<boolean>>) => () => {
  const timeout = setTimeout(() => {
    setSandboxVisible(false)
  }, 5000)

  return () => clearTimeout(timeout)
}

export const handleSandboxClick =
  (setSandboxVisible: Dispatch<SetStateAction<boolean>>, sandboxVisibile: boolean) => () => {
    setSandboxVisible(!sandboxVisibile)
  }

export const SwaggerPage: FC<SwaggerPageProps> = ({ swaggerUri }) => {
  const [loading, setLoading] = useState(true)
  const [sandboxVisible, setSandboxVisible] = useState(true)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  useEffect(handleSandboxTimeout(setSandboxVisible), [])

  const requestInterceptor = (params: InterceptorParams) => fetchInterceptor(params, connectSession?.accessToken)

  return (
    <ErrorBoundary>
      {(loading || !connectSession?.accessToken || !swaggerUri) && <Loader fullPage />}
      <PersistentNotification
        onClick={handleSandboxClick(setSandboxVisible, sandboxVisible)}
        isExpanded={sandboxVisible}
        intent="primary"
      >
        This is a sandbox environment, with anonymised test data and isolated from production
      </PersistentNotification>
      <div className={cx(swagger, (loading || !swaggerUri) && swaggerHidden)}>
        <Title>Foundations API</Title>
        <BodyText hasGreyText>
          This tool is interactive and provides instant access to data hosted in our sandbox environment with
          authentication and versioning headers pre-populated. Example requests and responses are shown by default but
          you can switch to view a fully documented schema - look for the model link.
        </BodyText>
        <SwaggerUI
          url={swaggerUri}
          onComplete={handleOnComplete(setLoading)}
          docExpansion="none"
          requestInterceptor={requestInterceptor}
          responseInterceptor={responseInterceptor}
        />
      </div>
    </ErrorBoundary>
  )
}

export default SwaggerPage
