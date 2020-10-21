import * as React from 'react'
import { shallow } from 'enzyme'
import ProjectorProperty, { ProjectorPropertyProps } from '../property'

describe('Projector', () => {
  let wrapper
  const props = {
    config: {
      primaryColour: '#000000',
      secondaryColour: '#FFFFFF',
      headerTextColour: '#FF0000',
      showAddress: true,
    },
    property: {
      images: ['SOME_IMAGE'],
      bedrooms: 3,
      bathrooms: 2,
      letting: {
        status: 'toLet',
      },
      address: null,
    },
  } as ProjectorPropertyProps

  beforeEach(() => {
    wrapper = shallow(<ProjectorProperty {...props} />)
  })

  it('should match a snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should have existing elements', () => {
    expect(wrapper.exists('.property-projector-information')).toBe(true)
    expect(wrapper.exists('.sale-status')).toBe(true)
    expect(wrapper.exists('.address')).toBe(true)
    expect(wrapper.exists('.price')).toBe(true)
    expect(wrapper.exists('.rooms')).toBe(true)
  })

  it('should not have address element', () => {
    const newProps = { ...props, config: { ...props.config, showAddress: false } }
    const newWrapper = shallow(<ProjectorProperty {...newProps} />)
    expect(newWrapper.exists('.address')).toBe(false)
  })
})
