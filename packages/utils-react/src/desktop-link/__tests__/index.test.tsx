import React from 'react'
import { render } from '@testing-library/react'
import { AcProcessType, DesktopLink } from '..'

describe('DesktopLink', () => {
  it('should match a snapshot for a web email', () => {
    const wrapper = render(
      <DesktopLink uri="mail@example.com" acProcess={AcProcessType.mail} content="Some Content" target="_blank" />,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot for a web page', () => {
    const wrapper = render(
      <DesktopLink
        uri="https://www.example.com"
        acProcess={AcProcessType.web}
        content="Some Content"
        target="_blank"
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot for a desktop email', () => {
    window['__REAPIT_MARKETPLACE_GLOBALS__'] = {}
    const wrapper = render(
      <DesktopLink uri="mail@example.com" acProcess={AcProcessType.mail} content="Some Content" target="_blank" />,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot for a desktop page', () => {
    window['__REAPIT_MARKETPLACE_GLOBALS__'] = {}
    const wrapper = render(
      <DesktopLink
        uri="https://www.example.com"
        acProcess={AcProcessType.web}
        content="Some Content"
        target="_blank"
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot for a desktop app', () => {
    window['__REAPIT_MARKETPLACE_GLOBALS__'] = {}
    const wrapper = render(
      <DesktopLink
        uri="https://www.example.com"
        acProcess={AcProcessType.app}
        acId="MOCK_APP_ID"
        content="Some Content"
        target="_blank"
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
