import * as React from 'react'
import { shallow } from 'enzyme'
import { createBrowserHistory } from 'history'
import ElementsPage from '..'
import { Router, Route } from 'react-router-dom'

describe('ElementsPage', () => {
  it('should match a snapshot', () => {
    const history = createBrowserHistory()
    const wrapper = shallow(
      <Router history={history}>
        <Route>
          <ElementsPage />
        </Route>
      </Router>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
