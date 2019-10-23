import * as React from 'react'

import { FlexContainerResponsive, Content, H3, H4, FlexContainerBasic } from '@reapit/elements'

const WebComponentsPage: React.SFC = () => {
  return (
    <FlexContainerBasic flexColumn hasPadding>
      <Content>
        <FlexContainerResponsive flexColumn hasBackground hasPadding>
          <H3>Web Components</H3>
          <H4>Downloads</H4>
        </FlexContainerResponsive>
      </Content>
    </FlexContainerBasic>
  )
}

export default WebComponentsPage
