/** See: https://testing-library.com/docs/react-testing-library/setup#custom-render
 * Renders a React Component with a redux store and other UI providers as a testing convenience
 */

import React, { FC, ReactElement } from 'react'
import { queries, render, RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MediaStateProvider, NavStateProvider, SnackProvider } from '@reapit/elements'
import configureStore from 'redux-mock-store'
import appState from '../reducers/__stubs__/app-state'
import { ReduxState } from '../types/core'
import { Router } from 'react-router-dom'
import { createBrowserHistory, History } from 'history'

class ReduxTestState {
  state: ReduxState

  constructor() {
    this.state = appState
  }

  // Used to override the default populated state
  setState(newState: Partial<ReduxState>) {
    this.state = {
      ...this.state,
      ...newState,
    }
  }

  // Clean up method to revert to original default values in an afterEach hook or similar
  resetState() {
    this.state = appState
  }
}

/**  Create a singleton that I can update in my tests to override the default store uusage:
 * reduxTestState.setState({someReduxPartialKey: 'Some Value To Override'})
 * render(<MyCoolWrappedComponent />)
 * // Do some stuff then tidy up
 * reduxTestState.resetState()
 **/
const reduxTestState = new ReduxTestState()

const CombinedProvider: FC = ({ children }) => {
  const mockStore = configureStore()
  // Before first render, provider will instantiate the current value of the store
  const store = mockStore({ ...reduxTestState.state })
  const history: History<any> = createBrowserHistory()
  return (
    <Provider store={store}>
      <Router history={history}>
        <SnackProvider>
          <NavStateProvider>
            <MediaStateProvider>{children}</MediaStateProvider>
          </NavStateProvider>
        </SnackProvider>
      </Router>
    </Provider>
  )
}

const customRender = (ui: ReactElement, options?: RenderOptions<typeof queries, HTMLElement>) =>
  render(<CombinedProvider>{ui}</CombinedProvider>, { ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render, reduxTestState }
