import * as React from 'react'
import { shallow } from 'enzyme'
import { createBrowserHistory } from 'history'
import ApiDocs, { parseIframeUrl } from '../api-docs'
import { Router, Route } from 'react-router-dom'

describe('ApiDocs', () => {
  it('should match a snapshot', () => {
    const history = createBrowserHistory()
    const wrapper = shallow(
      <Router history={history}>
        <Route>
          <ApiDocs />
        </Route>
      </Router>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  describe('parseIframeUrl', () => {
    it('should return /api', () => {
      const input = '#api'
      const result = parseIframeUrl(input)
      expect(result).toEqual('/api')
    })
    it('should return /api/api-documentation', () => {
      const input = '#api-documentation'
      const result = parseIframeUrl(input)
      expect(result).toEqual('/api/api-documentation')
    })
    it('should return /api/reapit-connect', () => {
      const input = '#reapit-connect'
      const result = parseIframeUrl(input)
      expect(result).toEqual('/api/reapit-connect')
    })
    it('should return /api/reapit-connect', () => {
      const input = '#reapit-connect'
      const result = parseIframeUrl(input)
      expect(result).toEqual('/api/reapit-connect')
    })
    it('should return /api/web', () => {
      const input = '#web'
      const result = parseIframeUrl(input)
      expect(result).toEqual('/api/web')
    })
    it('should return /api/desktop-api', () => {
      const input = '#desktop-api'
      const result = parseIframeUrl(input)
      expect(result).toEqual('/api/desktop-api')
    })
    it('should return /open-source', () => {
      const input = '#open-source'
      const result = parseIframeUrl(input)
      expect(result).toEqual('/open-source')
    })
    it('should return /open-source/contributing', () => {
      const input = '#contributing'
      const result = parseIframeUrl(input)
      expect(result).toEqual('/open-source/contributing')
    })
    it('should return /open-source/packages', () => {
      const input = '#package'
      const result = parseIframeUrl(input)
      expect(result).toEqual('/open-source/packages')
    })
    it('should return /whats-new', () => {
      const input = '#whats-new'
      const result = parseIframeUrl(input)
      expect(result).toEqual('/whats-new')
    })
    it('should return /whats-new/platform-changelog', () => {
      const input = '#platform-changelog'
      const result = parseIframeUrl(input)
      expect(result).toEqual('/whats-new/platform-changelog')
    })
    it('should return /developer-portal', () => {
      const input = '#developer-portal'
      const result = parseIframeUrl(input)
      expect(result).toEqual('/developer-portal')
    })
    it('should return /', () => {
      const input = '#mockHashForDefault'
      const result = parseIframeUrl(input)
      expect(result).toEqual('/')
    })
  })
})
