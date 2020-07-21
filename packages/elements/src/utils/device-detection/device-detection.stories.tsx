import React from 'react'

import { storiesOf } from '@storybook/react'
import { isAndroid, isIOS, isMacLike, isMobile } from './device-detection'
import { Section } from '@/components/Layout'

storiesOf('DeviceDetection', module)
  .add('IsAndroid', () => {
    return (
      <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
        Device is Android: {isAndroid() ? 'True' : 'False'}
      </Section>
    )
  })
  .add('IsIOS', () => {
    return (
      <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
        Device is IOS: {isIOS() ? 'True' : 'False'}
      </Section>
    )
  })
  .add('IsMac', () => {
    return (
      <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
        Device is Mac: {isMacLike() ? 'True' : 'False'}
      </Section>
    )
  })
  .add('IsMobile', () => {
    return (
      <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
        Device is Mobile: {isMobile() ? 'True' : 'False'}
      </Section>
    )
  })
