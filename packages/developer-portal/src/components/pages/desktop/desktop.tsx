import React from 'react'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { H5, Grid, GridItem, Content, Section, Button, H3 } from '@reapit/elements'
import Routes from '@/constants/routes'
import DeveloperEditonModal from '@/components/ui/developer-edition-modal'
import { developerDesktopPricingTile } from './__styles__/pricing-tile'
import FadeIn from '../../../styles/fade-in'

export const handleToggleVisibleModal = (
  setIsDeveloperEditionModalOpen: React.Dispatch<boolean>,
  isVisible: boolean,
) => () => setIsDeveloperEditionModalOpen(isVisible)

export const DeveloperDesktopContentPartOne: React.FC = () => {
  return (
    <Content>
      <p>
        Reapit&#39;s Agency Cloud is a desktop application that offers estate agencies a comprehensive range of market
        leading agency products, including a Sales CRM, Lettings CRM, Client Accounts, Property Management and real-time
        Analytics.
      </p>
      <p>
        Developers that would like to integrate with or extend the functionality of Agency Cloud can use the Foundations
        Desktop API to build web applications for Reapit&#39;s app Marketplace that trigger events in the Agency Cloud
        desktop application, as well as associating their apps with common actions in Agency Cloud to replace default
        behaviours and screens.
      </p>
      <p>
        For example, a developer building a Marketplace app that provides AML and ID checking, can use the Desktop API
        to associate their app with the default ID checking screen in Agency Cloud. When a customer clicks the default
        button to launch the ID check screen, the developer&#39;s associated app would be presented instead.
      </p>
      <p>
        To learn more about what’s possible with the Desktop API, please visit the{' '}
        <a target="_blank" rel="noreferrer" href={`${Routes.API_DOCS}/api/desktop-api`}>
          documentation.
        </a>
      </p>
    </Content>
  )
}

export const DeveloperDesktopContentPartTwo: React.FC = () => {
  const [isDeveloperEditionModalOpen, setIsDeveloperEditionModalOpen] = React.useState<boolean>(false)
  return (
    <Content>
      <Grid>
        <GridItem>
          <H5>Developer Edition</H5>
          <p>
            The Developer Edition of Agency Cloud allows developers using the Desktop API to test their apps within the
            desktop application using sandbox data.
          </p>
          <p>
            There is no charge for the Developer Edition licence during the Beta phase, however, developers are required
            to confirm the subscription to proceed. When the Beta phase comes to an end, we will automatically cancel
            all subscriptions, and developers will need to sign-up again should they wish to subscribe and pay for a
            Developer Edition license.
          </p>
          <p>
            The application is licenced per user/developer of an organisation and will require a Windows machine to
            install it.
          </p>
        </GridItem>
        <GridItem>
          <div className={developerDesktopPricingTile}>
            <div className="desktop-inner-container">
              <div className="modal-card-head">
                <H5 className="mb-0" isCentered>
                  Developer Edition
                </H5>
              </div>
              <div className="justify-center items-center is-flex py-2">
                <span className="desktop-price">£0</span>&nbsp;
                <span className="desktop-price-period">/ Beta phase</span>
              </div>
              <div className="text-center px-2 py-1">Become familiar with our CRM software using sandbox data</div>
              <div className="text-center px-2 py-1">Test your Marketplace application inside Agency Cloud</div>
              <div className="text-center px-2 py-1">Understand how customers will interact with your application</div>
              <Section hasMargin={false}>
                <Button
                  type="button"
                  variant="primary"
                  fullWidth
                  onClick={handleToggleVisibleModal(setIsDeveloperEditionModalOpen, true)}
                >
                  Subscribe now
                </Button>
              </Section>
            </div>
          </div>
        </GridItem>
      </Grid>
      <DeveloperEditonModal
        visible={isDeveloperEditionModalOpen}
        afterClose={handleToggleVisibleModal(setIsDeveloperEditionModalOpen, false)}
      />
    </Content>
  )
}

export const DeveloperDesktopPage: React.FC = () => (
  <ErrorBoundary>
    <H3>Desktop</H3>
    <FadeIn>
      <Section hasPadding={false}>
        <DeveloperDesktopContentPartOne />
      </Section>
    </FadeIn>
    <FadeIn>
      <Section hasPadding={false}>
        <DeveloperDesktopContentPartTwo />
      </Section>
    </FadeIn>
  </ErrorBoundary>
)

export default DeveloperDesktopPage
