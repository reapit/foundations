import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { ToolbarItem } from '../toolbar-item'
import { ToolbarItemType } from '../types'
import { Editor } from '@craftjs/core'

describe('ToolbarItem', () => {
  it('should match a snapshot - Text', () => {
    render(
      <Editor>
        <ToolbarItem
          title={''}
          onChange={function (): void {
            throw new Error('Function not implemented.')
          }}
          propKey={''}
          type={ToolbarItemType.Text}
        />
      </Editor>,
    )
    expect(screen).toMatchSnapshot()
  })
  it('should match a snapshot - Number', () => {
    render(
      <Editor>
        <ToolbarItem
          title={''}
          onChange={function (): void {
            throw new Error('Function not implemented.')
          }}
          propKey={''}
          type={ToolbarItemType.Number}
        />
      </Editor>,
    )
    expect(screen).toMatchSnapshot()
  })
  it('should match a snapshot - Select', () => {
    render(
      <Editor>
        <ToolbarItem
          title={''}
          onChange={function (): void {
            throw new Error('Function not implemented.')
          }}
          propKey={''}
          type={ToolbarItemType.Select}
        />
      </Editor>,
    )
    expect(screen).toMatchSnapshot()
  })
  it('should match a snapshot - Slider', () => {
    render(
      <Editor>
        <ToolbarItem
          title={''}
          onChange={function (): void {
            throw new Error('Function not implemented.')
          }}
          propKey={''}
          type={ToolbarItemType.Slider}
        />
      </Editor>,
    )
    expect(screen).toMatchSnapshot()
  })
  it('should match a snapshot - Radio', () => {
    render(
      <Editor>
        <ToolbarItem
          title={''}
          onChange={function (): void {
            throw new Error('Function not implemented.')
          }}
          propKey={''}
          type={ToolbarItemType.Radio}
        />
      </Editor>,
    )
    expect(screen).toMatchSnapshot()
  })
})
