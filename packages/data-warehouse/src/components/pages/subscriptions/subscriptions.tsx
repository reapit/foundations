import React from 'react'
import { Content, FadeIn, H3, H5, Section } from '@reapit/elements'
import SubscriptionsContent from './subscriptions-content'

export const Subscriptions: React.FC = () => {
  return (
    <>
      <H3 isHeadingSection>Data Warehouse Account</H3>
      <FadeIn>
        <Section>
          <Content>
            <H5>How It Works</H5>
            <p>
              Reapit&#39;s data warehouse is a premium service that provides your organisation&#39;s data in an
              analytics focused format. Our cloud-based warehouse technology is supported by all major business
              intelligence applications such as Microsoft Power BI and Tableau, to allow you to extract new value and
              insights from your data.
            </p>
            <p>
              This application can provision a dedicated virtual data warehouse and allow you to manage which users and
              applications have access to it. The analytics area allows you to track usage statistics and set limits on
              your monthly spend. For usage instructions,{' '}
              <a
                href="https://www.youtube.com/watch?v=N-4TeWsM7EU&feature=youtu.be"
                target="_blank"
                rel="noopener noreferrer"
              >
                click here.
              </a>
            </p>
          </Content>
        </Section>
      </FadeIn>
      <SubscriptionsContent />
    </>
  )
}

export default Subscriptions
