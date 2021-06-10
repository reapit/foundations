import { reapitConnectBrowserSession } from '@/core/connect-session'
import { configurationApiKeyApiService } from '@/platform-api/configuration-api'
import { ReapitConnectSession, useReapitConnect } from '@reapit/connect-session'
import { Loader } from '@reapit/elements/v3'
import { ApiKeyInterface } from '@reapit/foundations-ts-definitions'
import React, { useEffect, useState } from 'react'

export default () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [apiKeys, setApiKeys] = useState<ApiKeyInterface[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchApiKeys = async () => {
      setLoading(true)
      const serviceResponse = await configurationApiKeyApiService(connectSession as ReapitConnectSession)
      setLoading(false)
      if (serviceResponse) {
        console.log(serviceResponse)
        setApiKeys(apiKeys)
      }
    }
    if (connectSession) {
      fetchApiKeys()
    }
  }, [connectSession])

  return (
    <>
      <h1>Api Keys</h1>
      {loading ? <Loader /> : <h2>Not Loading</h2>}
    </>
  )
}
