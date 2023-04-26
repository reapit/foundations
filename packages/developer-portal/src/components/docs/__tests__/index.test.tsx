import React from 'react'
import DocsPage, { parseIframeUrl } from '../index'
import Routes from '../../../constants/routes'
import { render } from '../../../tests/react-testing'

jest.mock('react-router', () => ({
  ...(jest.requireActual('react-router') as Object),
  useLocation: jest.fn(() => ({ search: '', pathname: '/test' })),
}))

describe('DocsPage', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<DocsPage />)
    expect(wrapper).toMatchSnapshot()
  })

  describe('parseIframeUrl', () => {
    it('should run correctly', () => {
      const pathname = `${Routes.API_DOCS}/platform-glossary`
      const hash = '#company'
      const result = parseIframeUrl(pathname, hash)
      expect(result).toEqual('/platform-glossary#company')
    })
  })
})
