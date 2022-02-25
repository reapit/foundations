import * as React from 'react'
import { shallow } from 'enzyme'
import { ToolbarItem } from '../toolbar-item'
import { ToolbarItemType } from '../types'

describe('ToolbarItem', () => {
  it('should match a snapshot - Text', () => {
    const wrapper = shallow(
      <ToolbarItem
        title={''}
        onChange={function (): void {
          throw new Error('Function not implemented.')
        }}
        propKey={''}
        type={ToolbarItemType.Text}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('should match a snapshot - Number', () => {
    const wrapper = shallow(
      <ToolbarItem
        title={''}
        onChange={function (): void {
          throw new Error('Function not implemented.')
        }}
        propKey={''}
        type={ToolbarItemType.Number}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('should match a snapshot - Select', () => {
    const wrapper = shallow(
      <ToolbarItem
        title={''}
        onChange={function (): void {
          throw new Error('Function not implemented.')
        }}
        propKey={''}
        type={ToolbarItemType.Select}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('should match a snapshot - Slider', () => {
    const wrapper = shallow(
      <ToolbarItem
        title={''}
        onChange={function (): void {
          throw new Error('Function not implemented.')
        }}
        propKey={''}
        type={ToolbarItemType.Slider}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('should match a snapshot - Radio', () => {
    const wrapper = shallow(
      <ToolbarItem
        title={''}
        onChange={function (): void {
          throw new Error('Function not implemented.')
        }}
        propKey={''}
        type={ToolbarItemType.Radio}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
