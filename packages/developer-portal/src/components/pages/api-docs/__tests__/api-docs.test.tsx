import * as React from 'react'
import { shallow } from 'enzyme'
import { createBrowserHistory } from 'history'
import ApiDocs, { parseIframeUrl } from '../api-docs'
import Routes from '@/constants/routes'
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
    it('should run correctly', () => {
      const pathname = `${Routes.DEVELOPER_API_DOCS}/platform-glossary`
      const hash = '#company'
      const result = parseIframeUrl(pathname, hash)
      expect(result).toEqual('/platform-glossary#company')
    })
  })
})
