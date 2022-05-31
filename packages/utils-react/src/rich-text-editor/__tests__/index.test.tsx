import * as React from 'react'
import { render } from '@testing-library/react'
import { Editor, EditorProps } from '../index'

const defaultProps = {
  onChange: () => {},
  defaultContent: '<b>Editor</b>',
  containerClass: 'pell-container',
  actionbarClass: 'pell-actionbar',
  buttonClass: 'pell-button',
  contentClass: 'pell-content',
  actions: undefined,
} as EditorProps

describe('Editor', () => {
  it('should match a snapshot', () => {
    const mounted = render(<Editor {...defaultProps} />)
    expect(mounted).toMatchSnapshot()
  })
})
