import * as React from 'react'

import { FlexContainerResponsive, Content, H3, H4, FlexContainerBasic } from '@reapit/elements'

const SettingsPage: React.SFC = () => {
  return (
    <FlexContainerBasic flexColumn hasPadding>
      <Content>
        <FlexContainerResponsive flexColumn hasBackground hasPadding>
          <H3>Settings</H3>
          <H4>Payment Info</H4>
        </FlexContainerResponsive>
      </Content>
    </FlexContainerBasic>
  )
}

export default SettingsPage
