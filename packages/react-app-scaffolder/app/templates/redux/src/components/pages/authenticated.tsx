import * as React from 'react'
import { H3, H5, Section, Content } from '@reapit/elements'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'

export type AuthenticatedProps = {}

export const Authenticated: React.FC<AuthenticatedProps> = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  console.log('Session is', connectSession)
  return (
    <>
      <Content>
        <H3 isHeadingSection>Welcome To Reapit Foundations</H3>
        <Section>
          <H5>Next steps:</H5>
          <p>You are now authenticated against our sandbox data.</p>
          <p>
            Your Reapit connectSession object is available via the useReapitConnect hook and will be automatically
            refreshed unless you logout. This will provide you with an accessToken and login identity information to
            authenticate against our plaform APIs. For more on this{' '}
            <a
              href="https://developers.reapit.cloud/api-docs//api/web#connect-session"
              target="_blank"
              rel="noreferrer noopener"
            >
              visit here.
            </a>
          </p>
        </Section>
      </Content>
    </>
  )
}

export default Authenticated
