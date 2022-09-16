import React from 'react'
import { render } from '../../../../tests/react-testing'
import { DiffRenderHTML, DiffRenderHTMLProps } from '..'

const mockProps: DiffRenderHTMLProps = {
  currentString: '<h1>hello world</h1>',
  changedString: '<p>hello galaxy</p>',
}

describe('DiffRenderHTML', () => {
  it('should match snapshot', () => {
    const wrapper = render(<DiffRenderHTML {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })
})
