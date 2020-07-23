import * as React from 'react'
import { shallow } from 'enzyme'
import { Fade } from '../fade'

describe('Fade', () => {
  it('should match a snapshot', () => {
    const mockProps = {
      in: true,
      timeout: 300,
    }
    const wrapper = shallow(
      <Fade {...mockProps}>
        <div>MockChildren</div>
      </Fade>,
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('should match a snapshot', () => {
    const mockProps = {
      in: false,
      timeout: 300,
    }
    const wrapper = shallow(
      <Fade {...mockProps}>
        <div>MockChildren</div>
      </Fade>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
