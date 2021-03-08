import React, { useEffect, useState } from 'react'
import { H3, Section, Content, Helper, Loader } from '@reapit/elements'
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
      }
    }
    if (connectSession) {
      setLoading(true)
      fetchAppoinmentConfigs()
    }
  }, [connectSession])
  console.log('Metabase URI is', metabaseCredentials?.url)
  return (
    <>
      <Content>
        <H3 isHeadingSection>Reapit Insights</H3>
        <Section isFlex isFlexColumn>
          {loading ? (
            <Loader />
          ) : metabaseCredentials && !metabaseCredentials.url ? (
            <Helper>No credentials found to load the application</Helper>
          ) : (
            <iframe
              style={{ border: 'none', flexGrow: 1 }}
              src={metabaseCredentials?.url as string}
              width="100%"
              height="900px"
            />
          )}
        </Section>
      </Content>
    </>
  )
}

export default Home
