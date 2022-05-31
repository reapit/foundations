import React from 'react'
import { render } from '../../../../tests/react-testing'
import { DiffViewer, DiffViewerProps } from '../diff-viewer'

const mockProps: DiffViewerProps = {
  currentString: 'hello world',
  changedString: 'hello galaxy',
  type: 'lines',
}

describe('DiffViewer', () => {
  it('should match snapshot', () => {
    const wrapper = render(<DiffViewer {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })
})
