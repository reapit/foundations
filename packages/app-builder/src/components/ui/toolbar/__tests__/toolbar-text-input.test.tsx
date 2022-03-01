import * as React from 'react'
import { render } from '@testing-library/react'
import { ToolbarTextInput } from '../toolbar-text-input'
import { ToolbarItemType } from '..'

describe('ToolbarRadio', () => {
  it('should match a snapshot - Text', () => {
    const { asFragment } = render(
      <ToolbarTextInput
        value={''}
        type={ToolbarItemType.Text}
        onChange={function (): void {
          throw new Error('Function not implemented.')
        }}
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })
  it('should match a snapshot - Number', () => {
    const { asFragment } = render(
      <ToolbarTextInput
        value={''}
        type={ToolbarItemType.Number}
        onChange={function (): void {
          throw new Error('Function not implemented.')
        }}
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })
  it('should match a snapshot - Radio', () => {
    const { asFragment } = render(
      <ToolbarTextInput
        value={''}
        type={ToolbarItemType.Radio}
        onChange={function (): void {
          throw new Error('Function not implemented.')
        }}
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })
  it('should match a snapshot - Select', () => {
    const { asFragment } = render(
      <ToolbarTextInput
        value={''}
        type={ToolbarItemType.Select}
        onChange={function (): void {
          throw new Error('Function not implemented.')
        }}
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })
  it('should match a snapshot - Slider', () => {
    const { asFragment } = render(
      <ToolbarTextInput
        value={''}
        type={ToolbarItemType.Slider}
        onChange={function (): void {
          throw new Error('Function not implemented.')
        }}
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
