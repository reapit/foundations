import * as React from 'react'
import { shallow } from 'enzyme'
import { DisplayToolbarSection } from '../toolbar-section'

describe('ToolbarSection', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(
      <DisplayToolbarSection title={''} summaryText={''}>
        <></>
      </DisplayToolbarSection>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
