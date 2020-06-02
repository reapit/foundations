import * as React from 'react'
import { FlexContainerResponsive, Content, FlexContainerBasic } from '@reapit/elements'
import { Tabs } from '../tabs'

const DevelperSettingsOrganisationTabPage: React.FC<{}> = () => {
  return (
    <FlexContainerBasic flexColumn hasPadding>
      <Content>
        <FlexContainerResponsive flexColumn hasBackground hasPadding>
          <Tabs />
        </FlexContainerResponsive>
      </Content>
    </FlexContainerBasic>
  )
}

export default DevelperSettingsOrganisationTabPage
