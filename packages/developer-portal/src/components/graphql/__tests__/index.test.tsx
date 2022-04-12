import * as React from 'react'
import { shallow } from 'enzyme'
import { createBrowserHistory } from 'history'
import GraphQLPage from '..'
import { Router, Route } from 'react-router-dom'

describe('GraphQLPage', () => {
  it('should match a snapshot', () => {
    const history = createBrowserHistory()
    const wrapper = shallow(
      <Router history={history}>
        <Route>
          <GraphQLPage />
        </Route>
      </Router>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
