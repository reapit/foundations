import React from 'react'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { H5, Content, Section, Button, H3 } from '@reapit/elements'
import Routes from '@/constants/routes'
import DeveloperEditonModal from '@/components/ui/developer-edition-modal'
import { developerDesktopPricingTile } from './__styles__/pricing-tile'
import { Grid, Col } from '../../../styles/grid'
// import FadeIn from '../../../styles/fade-in'

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
    </Content>
  )
}

export const DeveloperDesktopContentPartTwo: React.FC = () => {
  return (
    <Content>
      <H5>About Foundations Desktop API</H5>
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

export const DeveloperDesktopContentPartThree: React.FC = () => {
  return (
    <Content>
      <H5>How your app integrates with the Developer Edition of Agency Cloud</H5>
      video here
      <p>
        The Developer Edition of Agency Cloud allows developers using the Desktop API to test their apps within the
        desktop application using sandbox data.
      </p>
    </Content>
  )
}

export const DeveloperDesktopContentPartFour: React.FC = () => {
  const [isDeveloperEditionModalOpen, setIsDeveloperEditionModalOpen] = React.useState<boolean>(false)
  return (
    <Content>
      <H5>Developer Edition</H5>
      <p>
        The Developer Edition of Agency Cloud allows developers using the Desktop API to test their apps within the
        desktop application using sandbox data.
      </p>
      <p>
        From 1st April, the Developer Edition of Agency Cloud will no longer be a free subscription. If you had
        subscribed during the Beta Phase and still wish to continue to use the software, please re subscribe.
      </p>
      <p>
        The application is licenced per user/developer of an organisation and will require a Windows machine to install
        it.
      </p>

      <div className={developerDesktopPricingTile}>
        <div className="desktop-inner-container">
          <div className="modal-card-head mb-4">
            <H5 className="mb-0" isCentered>
              Developer Edition
            </H5>
          </div>
          <div className="justify-center items-center is-flex py-2">
            <span className="desktop-price">£300</span>&nbsp;
            <span className="desktop-price-period">/ Month</span>
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
    <Grid>
      <Col span={8}>
        <DeveloperDesktopContentPartOne />
        <Grid>
          <Col span={6}>
            <DeveloperDesktopContentPartTwo />
          </Col>
          <Col span={6}>
            <DeveloperDesktopContentPartThree />
          </Col>
        </Grid>
      </Col>
      <Col span={4}>
        <DeveloperDesktopContentPartFour />
      </Col>
    </Grid>
  </ErrorBoundary>
)

export default DeveloperDesktopPage
