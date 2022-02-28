import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { ToolbarTextInput } from '../toolbar-text-input'
import { ToolbarItemType } from '..'

describe('ToolbarRadio', () => {
  it('should match a snapshot - Text', () => {
    render(
      <ToolbarTextInput
        value={''}
        type={ToolbarItemType.Text}
        onChange={function (): void {
          throw new Error('Function not implemented.')
        }}
      />,
    )
    expect(screen).toMatchSnapshot()
  })
  it('should match a snapshot - Number', () => {
    render(
      <ToolbarTextInput
        value={''}
        type={ToolbarItemType.Number}
        onChange={function (): void {
          throw new Error('Function not implemented.')
        }}
      />,
    )
    expect(screen).toMatchSnapshot()
  })
  it('should match a snapshot - Radio', () => {
    render(
      <ToolbarTextInput
        value={''}
        type={ToolbarItemType.Radio}
        onChange={function (): void {
          throw new Error('Function not implemented.')
        }}
      />,
    )
    expect(screen).toMatchSnapshot()
  })
  it('should match a snapshot - Select', () => {
    render(
      <ToolbarTextInput
        value={''}
        type={ToolbarItemType.Select}
        onChange={function (): void {
          throw new Error('Function not implemented.')
        }}
      />,
    )
    expect(screen).toMatchSnapshot()
  })
  it('should match a snapshot - Slider', () => {
    render(
      <ToolbarTextInput
        value={''}
        type={ToolbarItemType.Slider}
        onChange={function (): void {
          throw new Error('Function not implemented.')
        }}
      />,
    )
    expect(screen).toMatchSnapshot()
  })
})
