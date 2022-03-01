import * as React from 'react'
import { render } from '@testing-library/react'
import { ToolbarItem } from '../toolbar-item'
import { ToolbarItemType } from '../types'

jest.mock('@craftjs/core', () => {
  return {
    useEditor: () => ({}),
    useNode: () => ({
      connectors: {},
      actions: {},
    }),
  }
})

describe('ToolbarItem', () => {
  it('should match a snapshot - Text', () => {
    const { asFragment } = render(
      <ToolbarItem
        title={''}
        onChange={function (): void {
          throw new Error('Function not implemented.')
        }}
        propKey={''}
        type={ToolbarItemType.Text}
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })
  it('should match a snapshot - Number', () => {
    const { asFragment } = render(
      <ToolbarItem
        title={''}
        onChange={function (): void {
          throw new Error('Function not implemented.')
        }}
        propKey={''}
        type={ToolbarItemType.Number}
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })
  it('should match a snapshot - Select', () => {
    const { asFragment } = render(
      <ToolbarItem
        title={''}
        onChange={function (): void {
          throw new Error('Function not implemented.')
        }}
        propKey={''}
        type={ToolbarItemType.Select}
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })
  it('should match a snapshot - Slider', () => {
    const { asFragment } = render(
      <ToolbarItem
        title={''}
        onChange={function (): void {
          throw new Error('Function not implemented.')
        }}
        propKey={''}
        type={ToolbarItemType.Slider}
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })
  it('should match a snapshot - Radio', () => {
    const { asFragment } = render(
      <ToolbarItem
        title={''}
        onChange={function (): void {
          throw new Error('Function not implemented.')
        }}
        propKey={''}
        type={ToolbarItemType.Radio}
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
