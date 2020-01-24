import React from 'react'

import { storiesOf } from '@storybook/react'
import { isAndroid, isIOS, isMacLike, isMobile } from './device-detection'

storiesOf('DeviceDetection', module)
  .add('IsAndroid', () => {
    return <section className="section">Device is Android: {isAndroid() ? 'True' : 'False'}</section>
  })
  .add('IsIOS', () => {
    return <section className="section">Device is IOS: {isIOS() ? 'True' : 'False'}</section>
  })
  .add('IsMac', () => {
    return <section className="section">Device is Mac: {isMacLike() ? 'True' : 'False'}</section>
  })
  .add('IsMobile', () => {
    return <section className="section">Device is Mobile: {isMobile() ? 'True' : 'False'}</section>
  })
