import React, { MouseEvent } from 'react'
import { render } from '@testing-library/react'
import { AcProcessType, DesktopLink, handleNavigate, handleOnClick } from '..'

describe('DesktopLink', () => {
  it('should match a snapshot for a web email', () => {
    const wrapper = render(
      <DesktopLink uri="mail@example.com" acProcess={AcProcessType.mail} content="Some Content" target="_blank" />,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot for a web emai with consent', () => {
    const wrapper = render(
      <DesktopLink
        uri="mail@example.com"
        acProcess={AcProcessType.mail}
        content="Some Content"
        target="_blank"
        consentModal={{
          title: 'Email enquiry',
          body: 'Click to continue',
        }}
      />,
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

describe('handleNavigate', () => {
  it('should handle navigation for a target blank', () => {
    const openSpy = jest.spyOn(window, 'open')
    const target = '_blank'
    const href = 'https://www.example.com'
    const closeConsentModal = jest.fn()
    const onClick = jest.fn()

    const curried = handleNavigate(target, href, closeConsentModal, false, onClick)

    curried()

    expect(openSpy).toHaveBeenCalledWith(href, '_blank', 'noopener noreferrer')
  })

  it('should handle navigation for a target self', () => {
    const openSpy = jest.spyOn(window, 'open')
    const target = '_self'
    const href = 'https://www.example.com'
    const closeConsentModal = jest.fn()
    const onClick = jest.fn()

    const curried = handleNavigate(target, href, closeConsentModal, false, onClick)

    curried()

    expect(openSpy).not.toHaveBeenCalled()
    expect(window.location.href).toEqual(href)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})

describe('handleOnClick', () => {
  it('should open a modal if has a consent modal param', () => {
    const openModal = jest.fn()
    const navigate = jest.fn()
    const consentModal = {
      title: 'Title',
      body: 'Body',
    }
    const event = {
      preventDefault: jest.fn(),
    } as unknown as MouseEvent<HTMLAnchorElement>

    const curried = handleOnClick(openModal, navigate, consentModal)

    curried(event)

    expect(openModal).toHaveBeenCalledTimes(1)
    expect(event.preventDefault).toHaveBeenCalledTimes(1)
    expect(navigate).not.toHaveBeenCalled()
  })

  it('should naviage if has no consent modal param', () => {
    const openModal = jest.fn()
    const navigate = jest.fn()
    const event = {
      preventDefault: jest.fn(),
    } as unknown as MouseEvent<HTMLAnchorElement>

    const curried = handleOnClick(openModal, navigate)

    curried(event)

    expect(openModal).not.toHaveBeenCalled()
    expect(event.preventDefault).not.toHaveBeenCalled()
    expect(navigate).toHaveBeenCalledTimes(1)
  })
})
