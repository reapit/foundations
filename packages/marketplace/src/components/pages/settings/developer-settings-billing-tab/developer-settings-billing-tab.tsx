import * as React from 'react'
import { FlexContainerResponsive, Content, FlexContainerBasic, H3 } from '@reapit/elements'
import { Tabs } from '../tabs'
import AccountsInformationForm from './accounts-information-form'

const DevelperSettingsBillingTabPage: React.FC<{}> = () => {
  return (
    <FlexContainerBasic flexColumn hasPadding>
      <Content>
        <FlexContainerResponsive flexColumn hasBackground hasPadding>
          <Tabs />
          <Content>
            <FlexContainerResponsive flexColumn hasBackground hasPadding>
              <H3>Accounts Information</H3>
              <AccountsInformationForm />
            </FlexContainerResponsive>
          </Content>
        </FlexContainerResponsive>
      </Content>
    </FlexContainerBasic>
  )
}

export default DevelperSettingsBillingTabPage
