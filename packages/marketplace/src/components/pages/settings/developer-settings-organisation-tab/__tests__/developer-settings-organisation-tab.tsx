import React from 'react'
import { shallow } from 'enzyme'
import DeveloperOrganisationTabPage from '../developer-settings-organisation-tab'

describe('DeveloperOrganisationTabPage', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<DeveloperOrganisationTabPage />)
    expect(wrapper).toMatchSnapshot()
  })
})
