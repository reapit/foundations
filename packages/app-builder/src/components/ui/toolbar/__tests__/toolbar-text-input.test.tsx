import * as React from 'react'
import { shallow } from 'enzyme'
import { ToolbarTextInput } from '../toolbar-text-input'
import { ToolbarItemType } from '..'

describe('ToolbarRadio', () => {
  it('should match a snapshot - Text', () => {
    const wrapper = shallow(
      <ToolbarTextInput
        value={''}
        type={ToolbarItemType.Text}
        onChange={function (): void {
          throw new Error('Function not implemented.')
        }}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('should match a snapshot - Number', () => {
    const wrapper = shallow(
      <ToolbarTextInput
        value={''}
        type={ToolbarItemType.Number}
        onChange={function (): void {
          throw new Error('Function not implemented.')
        }}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('should match a snapshot - Radio', () => {
    const wrapper = shallow(
      <ToolbarTextInput
        value={''}
        type={ToolbarItemType.Radio}
        onChange={function (): void {
          throw new Error('Function not implemented.')
        }}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('should match a snapshot - Select', () => {
    const wrapper = shallow(
      <ToolbarTextInput
        value={''}
        type={ToolbarItemType.Select}
        onChange={function (): void {
          throw new Error('Function not implemented.')
        }}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('should match a snapshot - Slider', () => {
    const wrapper = shallow(
      <ToolbarTextInput
        value={''}
        type={ToolbarItemType.Slider}
        onChange={function (): void {
          throw new Error('Function not implemented.')
        }}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
