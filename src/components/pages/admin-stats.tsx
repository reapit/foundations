import React from 'react'
import { FlexContainerResponsive, FlexContainerBasic, Content, H3 } from '@reapit/elements'

export const AdminStats: React.FC = () => {
  return (
    <FlexContainerBasic flexColumn hasPadding>
      <Content>
        <FlexContainerResponsive flexColumn hasBackground hasPadding>
          <H3>Stats</H3>
        </FlexContainerResponsive>
      </Content>
    </FlexContainerBasic>
  )
}

export default AdminStats
