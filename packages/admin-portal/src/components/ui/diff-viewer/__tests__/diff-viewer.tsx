import React from 'react'
import { shallow } from 'enzyme'
import { DiffViewer, DiffViewerProps } from '../diff-viewer'

const mockProps: DiffViewerProps = {
  currentString: 'hello world',
  changedString: 'hello galaxy',
  type: 'lines',
}

describe('DiffViewer', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<DiffViewer {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })
})
