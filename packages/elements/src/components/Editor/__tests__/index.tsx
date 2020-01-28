import * as React from 'react'
import { mount } from 'enzyme'
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
    const mounted = mount(<Editor {...defaultProps} />).html()
    expect(mounted).toMatchSnapshot()
  })
})
