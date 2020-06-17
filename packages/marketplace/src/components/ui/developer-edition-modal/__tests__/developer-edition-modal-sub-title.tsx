import * as React from 'react'
import { shallow } from 'enzyme'
import { DeveloperEditionModalSubTitle } from '../developer-edition-modal-sub-title'

describe('DeveloperEditionModalSubTitle', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<DeveloperEditionModalSubTitle />)
    expect(wrapper).toMatchSnapshot()
  })
})
