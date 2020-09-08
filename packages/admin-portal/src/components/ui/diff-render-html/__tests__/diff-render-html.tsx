import React from 'react'
import { shallow } from 'enzyme'
import { DiffRenderHTML, DiffRenderHTMLProps } from '../diff-render-html'

const mockProps: DiffRenderHTMLProps = {
  currentString: '<h1>hello world</h1>',
  changedString: '<p>hello galaxy</p>',
}

describe('DiffRenderHTML', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<DiffRenderHTML {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })
})
