import * as React from 'react'
import { shallow } from 'enzyme'
import DiffRenderHTML, { DiffRenderHTMLProps } from '../diff-render-html'

const props: DiffRenderHTMLProps = {
  currentString: 'abc',
  changedString: '<b>axxxxxxxxxxxbc<b>',
}

describe('DiffRenderHTML', () => {
  it('should match a snapshot', () => {
    expect(shallow(<DiffRenderHTML {...props} />)).toMatchSnapshot()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
