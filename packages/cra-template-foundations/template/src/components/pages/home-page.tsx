import React, { FC } from 'react'
import { Title, BodyText, PageContainer, PersistantNotification, elMb7 } from '@reapit/elements'

export const HomePage: FC = () => (
  <PageContainer>
    <Title>Welcome To Reapit Foundations</Title>
    <PersistantNotification className={elMb7} isExpanded intent="success" isInline isFullWidth>
      You are now authenticated against our sandbox data.
    </PersistantNotification>
    <BodyText hasGreyText>
      Your Reapit connectSession object is available via the useReapitConnect hook and will be automatically refreshed
      unless you logout. This will provide you with an accessToken and login identity information to authenticate
      against our plaform APIs. For more on this{' '}
      <a
        href="https://developers.reapit.cloud/api-docs//api/web#connect-session"
        target="_blank"
        rel="noreferrer noopener"
      >
        visit here.
      </a>
    </BodyText>
    <BodyText hasGreyText>
      There is a sample fetch service that pulls Appointment Config Types from Foundations API to demonstrate fetching
      data using this scaffold, see the &lsquo;Data&rsquo; page in the navigation bar. Naturally you can replace this
      endpoint in the platform-api file with an API of your choosing from the API explorer in the developer portal. For
      our API explorer{' '}
      <a href="https://developers.reapit.cloud/swagger" target="_blank" rel="noreferrer noopener">
        visit here.
      </a>
    </BodyText>
    <BodyText hasGreyText>
      Included in the scaffold is the latest version of the Elements UI library. This is the simplest way for you to
      adhere to the basic style guidelines for Marketplace applications. For more on this{' '}
      <a href="https://developers.reapit.cloud/api-docs/elements" target="_blank" rel="noreferrer noopener">
        visit here.{' '}
      </a>
      See also the &lsquo;UI&rsquo; page in the navigation bar for examples of how to use Elements components.
    </BodyText>
  </PageContainer>
)

export default HomePage
