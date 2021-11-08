import React from 'react'
import { render } from '@testing-library/react'
import { HelperWidgetApps } from '../config'
import { handleToggleWidget, HelperContentType, HelperWidget } from '../helper-widget'

describe('HelperWidget', () => {
  it('should match a snapshot for a found config', () => {
    globalThis.location.pathname = '/webhooks/about'
    expect(render(<HelperWidget appName={HelperWidgetApps.developerPortal} />)).toMatchSnapshot()
  })
})
describe('handleToggleWidget', () => {
  it('should handle setting the content type', () => {
    const setContentType = jest.fn()
    const curried = handleToggleWidget(HelperContentType.chat, setContentType)
    curried()
    expect(setContentType).toHaveBeenCalledWith(HelperContentType.chat)
  })
})
