import React from 'react'
import { render } from '@testing-library/react'
import ExamplesPage from '../examples-page'
import { Router, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory()

describe('ExamplesPage', () => {
  it('should match a snapshot', () => {
    expect(
      render(
        <Router history={history}>
          <Switch>
            <ExamplesPage />
          </Switch>
        </Router>,
      ),
    ).toMatchSnapshot()
  })
})
