import React from 'react'
import { Story } from '@storybook/react/types-6-0'
import { isAndroid, isIOS, isMacLike, isMobile, isDesktop } from './device-detection'

export default {
  title: 'Utils/DeviceDetection',
  component: <div />,
}

export const IsAndroid: Story = () => {
  return <div>Device is Android: {isAndroid() ? 'True' : 'False'}</div>
}
export const IsIOS: Story = () => {
  return <div>Device is IOS: {isIOS() ? 'True' : 'False'}</div>
}
export const IsMac: Story = () => {
  return <div>Device is Mac: {isMacLike() ? 'True' : 'False'}</div>
}
export const IsMobile: Story = () => {
  return <div>Device is Mobile: {isMobile() ? 'True' : 'False'}</div>
}
export const IsisDesktop: Story = () => {
  return <div>Device is isDesktop: {isDesktop() ? 'True' : 'False'}</div>
}
