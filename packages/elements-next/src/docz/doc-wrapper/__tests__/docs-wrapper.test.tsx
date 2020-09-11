import { shallow } from 'enzyme'

import React from 'react'
import { DocsWrapper, handleClipboardCopy } from '../docs-wrapper'

describe('docs-wrapper', () => {
  describe('DocsWrapper', () => {
    it('should match snapshot', () => {
      const wrapper = shallow(
        <DocsWrapper>
          <div>Mock children</div>
        </DocsWrapper>,
      )
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('handleClipboardCopy', () => {
    it('should run correctly', done => {
      const mockSetIsCopied = jest.fn()
      const fn = handleClipboardCopy(mockSetIsCopied)
      fn()
      expect(mockSetIsCopied).toBeCalledWith(true)
      setTimeout(() => {
        expect(mockSetIsCopied).toBeCalledWith(false)
        done()
      }, 3000)
    })
  })
})
