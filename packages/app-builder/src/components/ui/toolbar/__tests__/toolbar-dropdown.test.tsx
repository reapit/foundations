import * as React from 'react'
import { shallow } from 'enzyme'
import { ToolbarDropdown } from '../toolbar-dropdown'

describe('ToolbarDropdown', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(
      <ToolbarDropdown
        title={''}
        value={undefined}
        onChange={function (): void {
          throw new Error('Function not implemented.')
        }}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
