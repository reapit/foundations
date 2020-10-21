import * as React from 'react'
import { shallow } from 'enzyme'
import Projector, { ProjectorProps } from '../projector'

describe('Projector', () => {
  let wrapper
  const props = {
    config: {
      logo: '',
      primaryColour: '#000000',
      secondaryColour: '#FFFFFF',
      interval: 5,
    },
  } as ProjectorProps

  beforeEach(() => {
    wrapper = shallow(<Projector {...props} />)
  })

  it('should match a snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should be loading', () => {
    expect(wrapper.find('.projector-loading')).toHaveLength(1)
  })
})
