import * as React from 'react'
import { FlexContainerResponsive, Content, FlexContainerBasic, H3 } from '@reapit/elements'
import { Tabs } from '../tabs'
import AccountsInformationForm from './accounts-information-form'
import Subcriptions from '@/components/ui/developer-settings/billing/subscriptions'

const DevelperSettingsBillingTabPage: React.FC<{}> = () => {
  // FEATURE FLAG
  const isProd = window.reapit.config.appEnv === 'production'

  return (
    <FlexContainerBasic flexColumn hasPadding>
      <Content>
        <FlexContainerResponsive flexColumn hasBackground hasPadding>
          <Tabs />
          <Content>
            {// FEATURE FLAG
            !isProd && (
              <FlexContainerResponsive flexColumn hasBackground hasPadding>
                <H3>Accounts Information</H3>
                <AccountsInformationForm />
              </FlexContainerResponsive>
            )}
            <FlexContainerResponsive flexColumn hasBackground hasPadding>
              <Subcriptions />
            </FlexContainerResponsive>
          </Content>
        </FlexContainerResponsive>
      </Content>
    </FlexContainerBasic>
  )
}

export default DevelperSettingsBillingTabPage
