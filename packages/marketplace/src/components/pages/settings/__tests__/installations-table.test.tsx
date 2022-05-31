import React from 'react'
import { render } from '../../../../tests/react-testing'
import InstallationsTable, { handleMemoisedData, handleSetPageNumber } from '../installations-table'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import appState from '../../../../reducers/__stubs__/app-state'
import { stubAppsList, stubInstallations } from '../__stubs__/installations-table'
import { INSTALLATIONS_PER_PAGE } from '../../../../constants/paginator'

describe('InstallationsTable', () => {
  const mockStore = configureStore()
  const store = mockStore(appState)

  it('should match a snapshot', () => {
    expect(
      render(
        <Provider store={store}>
          <InstallationsTable />
        </Provider>,
      ),
    ).toMatchSnapshot()
  })

  it('should correctly return memoised, name matched, paginated data at page 1', () => {
    const memoHandler = handleMemoisedData(stubInstallations, stubAppsList.data, 1)
    const memoized = memoHandler()
    expect(memoized.length).toEqual(INSTALLATIONS_PER_PAGE)
    expect(memoized[0].appName).toEqual('Online Check List')
  })

  it('should correctly return memoised, name matched, paginated data at page 2', () => {
    const memoHandler = handleMemoisedData(stubInstallations, stubAppsList.data, 2)
    const memoized = memoHandler()
    expect(memoized.length).toEqual(2)
    expect(memoized[0].appName).toEqual('Data Warehouse')
  })

  it('should correctly handle pagination', () => {
    const setPage = jest.fn()
    const pageHandler = handleSetPageNumber(setPage)
    pageHandler(2)
    expect(setPage).toHaveBeenCalledWith(2)
  })
})
