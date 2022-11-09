import React from 'react'
import { render } from '@testing-library/react'
import Router, { catchChunkError } from '../router'
import { MediaStateProvider, NavStateProvider } from '@reapit/elements'
import { Router as ReactRouter, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory()

jest.mock('@reapit/connect-session', () => ({
  ReapitConnectBrowserSession: jest.fn(),
  useReapitConnect: () => ({
    connectSession: {
      loginIdentity: {},
    },
    connectInternalRedirect: '',
  }),
}))

describe('Router', () => {
  it('should match a snapshot', () => {
    expect(
      render(
        <ReactRouter history={history}>
          <Switch>
            <NavStateProvider>
              <MediaStateProvider>
                <Router />
              </MediaStateProvider>
            </NavStateProvider>
          </Switch>
        </ReactRouter>,
      ),
    ).toMatchSnapshot()
  })

  describe('catchChunkError', () => {
    it('should return promise', (done) => {
      const fn = jest.fn().mockResolvedValue(<div>Test</div>)
      const promiseFn = catchChunkError(fn)
      expect(promiseFn).toBeDefined()
      expect(fn).toBeCalled()
      expect(
        promiseFn.then((result) => {
          expect(result).toEqual(<div>Test</div>)
          done()
        }),
      )
    })
  })
})
