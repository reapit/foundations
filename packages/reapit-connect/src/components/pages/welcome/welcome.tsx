import * as React from 'react'
import { Section } from '@reapit/elements'
import logo from '@/assets/images/reapit-connect.png'
import RowSection from '@/components/ui/section'
import developerPortalImage from '@/assets/images/DeveloperPortalGraphic.jpg'
import marketplaceGraphicImage from '@/assets/images/MarketplaceGraphic.jpg'
import mainHeadingGraphicImage from '@/assets/images/MainHeadingGraphic.jpg'
import agencyCloudGraphicImage from '@/assets/images/AgencyCloudGraphic.jpg'
import { logoWrapStyle, logoStyle, buttonStyle, developerPortalButton, marketplaceButton } from './__styles__'
import { cx } from 'linaria'
import { useReapitConnect, ReapitConnectHook } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'

type WelcomeProps = {}

export const showHandleAgencyCloudSectionGroups = ['ReapitUser', 'ReapitUsersAdmin']

export const handleIsShowAgencyCloudSectionMemo = (session: ReapitConnectHook) => () => {
  const sessionGroups = session?.connectSession?.loginIdentity?.groups || []

  return sessionGroups.some(group => showHandleAgencyCloudSectionGroups.includes(group))
}

export const Welcome: React.FC<WelcomeProps> = () => {
  const session = useReapitConnect(reapitConnectBrowserSession)

  const isShowAgencyCloudSection = React.useMemo(handleIsShowAgencyCloudSectionMemo(session), [
    session?.connectSession?.loginIdentity?.groups,
  ])
  const developerId = session?.connectSession?.loginIdentity?.developerId
  const clientId = session?.connectSession?.loginIdentity?.clientId

  return (
    <Section>
      <div className={logoWrapStyle}>
        <img className={logoStyle} src={logo} alt="logo" />
      </div>
      <RowSection
        heading="Welcome to Reapit Connect"
        subheading="Your account has been successfully created"
        description="Reapit Connect is our single sign on solution which allows you to seamlessly access products and services provided by Reapit Ltd."
        image={mainHeadingGraphicImage}
      />
      {developerId && (
        <RowSection
          background="#209bd4"
          heading="Developer Portal"
          subheading="A self-service platform"
          description="The Foundations Developer Portal provides a fully scalable, high-performance platform that developers can
        quickly onboard in minutes to build powerful new apps that can be published directly to the Reapit App
        Marketplace to extend Agency Cloud and Property Cloud functionality."
          image={developerPortalImage}
          button={
            <a
              className={cx('button', buttonStyle, developerPortalButton)}
              target="_blank"
              rel="noopener noreferrer"
              href="https://developers.reapit.cloud"
            >
              DEVELOPERS PORTAL
            </a>
          }
        />
      )}
      {isShowAgencyCloudSection && (
        <RowSection
          background="#015b73"
          heading="Agency Cloud"
          subheading="Account Successfully Created"
          description="If you have Agency Cloud already installed on your machine, you can now login via Reapit Connect with your new credentials. If not, please contact your IT Department or Administrator to arrange installation."
          image={agencyCloudGraphicImage}
        />
      )}
      {clientId && (
        <RowSection
          background="#1e2554"
          heading="Marketplace"
          subheading="Enhancing the power of Agency Cloud"
          description="The Foundations App Marketplace provides agencies with a variety of app and software integrations that have been tested and approved for immediate integration, allowing agencies to customise their Reapit CRM software to suit their business needs."
          image={marketplaceGraphicImage}
          button={
            <a
              className={cx('button', buttonStyle, marketplaceButton)}
              target="_blank"
              rel="noopener noreferrer"
              href="https://marketplace.reapit.cloud"
            >
              Marketplace
            </a>
          }
        />
      )}
    </Section>
  )
}

export default Welcome
