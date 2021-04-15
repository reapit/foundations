import React, { useEffect, useState } from 'react'
import { H3, Section, Helper, Loader } from '@reapit/elements'
import { useReapitConnect, ReapitConnectSession } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { CredentialsModel, metabaseApiService } from '@/platform-api/metabase-api'

export type HomeProps = {}

export const Home: React.FC<HomeProps> = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [metabaseCredentials, setMetabaseCredentials] = useState<CredentialsModel | undefined>()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchAppoinmentConfigs = async () => {
      const serviceResponse = await metabaseApiService(connectSession as ReapitConnectSession)
      setLoading(false)
      if (serviceResponse) {
        setMetabaseCredentials(serviceResponse)
        if (serviceResponse && serviceResponse.url && serviceResponse.status === 'complete') {
          window.location.href = serviceResponse.url
        }
      }
    }
    if (connectSession) {
      setLoading(true)
      fetchAppoinmentConfigs()
    }
  }, [connectSession])

  return (
    <>
      <H3>Reapit Insights</H3>
      <Section isFlex isFlexColumn hasPadding={false} hasMargin={false} isFullHeight>
        {loading ? (
          <Loader />
        ) : metabaseCredentials && metabaseCredentials.status === 'failed' ? (
          <Helper>
            It looks like we have encountered an issue setting up your account. Please contact our support team
            <a href="mailto:foundationssupport@reapit.com">foundationssupport@reapit.com</a> for further assistance.
          </Helper>
        ) : metabaseCredentials && metabaseCredentials.status === 'incomplete' ? (
          <Helper>
            We are currently in the process of setting up your account. We will automatically send you an email once
            this has been completed.
          </Helper>
        ) : metabaseCredentials && !metabaseCredentials.url ? (
          <Helper>No credentials found to load the application</Helper>
        ) : (
          <Helper>You will now be redirected to Metabase</Helper>
        )}
      </Section>
    </>
  )
}

export default Home
