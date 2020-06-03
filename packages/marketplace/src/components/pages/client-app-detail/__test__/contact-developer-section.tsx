import React from 'react'
import { ContactDeveloperSection, ContactDeveloperSectionType } from '../contact-developer-section'
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

  test('handle open modal', () => {
    const wrapper = shallow(<ContactDeveloperSection {...props} />)
    const btnHelp = wrapper.find('[dataTest="btn-help"]')
    btnHelp.simulate('click')
    const modal = wrapper.find('[title="Contact Details"]')
    expect(modal.prop('visible')).toBeTruthy()
  })
})
