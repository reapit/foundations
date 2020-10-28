import React from 'react'
import { H3, H5, Section, Content } from '@reapit/elements'

export type SettingsProps = {}

export const Settings: React.FC<SettingsProps> = () => {
  return (
    <Content>
      <H3 isHeadingSection>Settings</H3>
      <Section>
        <H5>Next steps:</H5>
      </Section>
    </Content>
  )
}

export default Settings
