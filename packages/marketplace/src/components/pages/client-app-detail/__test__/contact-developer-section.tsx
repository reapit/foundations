import React from 'react'
import {
  ContactDeveloperSection,
  ContactDeveloperSectionType,
  openContactModal,
  closeContactModal,
} from '../contact-developer-section'
import { shallow } from 'enzyme'

const props: ContactDeveloperSectionType = {
  contact: {
    developer: 'Reapit Ltd',
    telephone: '0777 777 777',
    supportEmail: 'reapit@reapit.com',
    homePage: 'https://reapit.com',
  },
}

describe('ContactDeveloperSection', () => {
  test('should match snapshot without gutter', () => {
    expect(shallow(<ContactDeveloperSection {...props} hasGutter={false} />)).toMatchSnapshot()
  })

  test('should match snapshot with gutter', () => {
    expect(shallow(<ContactDeveloperSection {...props} hasGutter />)).toMatchSnapshot()
  })

  test('handle openContactModal', () => {
    const setVisible = jest.fn()
    openContactModal(setVisible)()
    expect(setVisible).toBeCalled()
    expect(setVisible).toBeCalledWith(true)
  })

  test('handle closeContactModal', () => {
    const setVisible = jest.fn()
    closeContactModal(setVisible)()
    expect(setVisible).toBeCalled()
    expect(setVisible).toBeCalledWith(false)
  })
})
