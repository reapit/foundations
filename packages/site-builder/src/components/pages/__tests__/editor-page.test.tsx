import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import EditorPage, {
  loadEditor,
  DEFAULT_IDENTIFIER,
  setTabsLocalStorage,
  getTabsLocalStorage,
  addNewPage,
} from '../editor-page'
import { AuthContext } from '@/context'
import { mockContext } from '@/context/__mocks__/mock-context'
import { initializeBlocks } from '@/core/initialize-components'
import { genTabConfig, LOCAL_STORAGE_KEY } from '../editor-page'

jest.mock('@/core/initialize-components')
jest.mock('@/core/editor')

describe('EditorPage', () => {
  it('should match a snapshot', () => {
    expect(
      toJson(
        shallow(
          <AuthContext.Provider value={mockContext}>
            <EditorPage />
          </AuthContext.Provider>,
        ),
      ),
    ).toMatchSnapshot()
  })

  it('should call setEditor from loadEditor', async () => {
    const fn = jest.fn()
    await loadEditor(fn, 'some-string')

    expect(initializeBlocks).toHaveBeenCalled()
    expect(fn).toHaveBeenCalled()
  })

  it('should generate a tab config', () => {
    const tabParams = {
      activeTab: 'PAGE-1',
      tabs: [DEFAULT_IDENTIFIER, 'PAGE-1'],
      handleChangeTab: jest.fn(),
      setEditor: jest.fn(),
      editor: {
        destroy: jest.fn(),
      },
    }

    const expected = JSON.stringify([
      { tabIdentifier: 'HOME', displayText: 'HOME', onTabClick: () => tabParams.handleChangeTab, active: false },
      { tabIdentifier: 'PAGE-1', displayText: 'PAGE-1', onTabClick: () => tabParams.handleChangeTab, active: true },
    ])

    const actual = JSON.stringify(genTabConfig(tabParams))

    expect(actual).toEqual(expected)
  })

  it('should set tabs on local storage', () => {
    const tabsList = [DEFAULT_IDENTIFIER, 'PAGE-1']
    setTabsLocalStorage(tabsList)

    const storedItem = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY) as string)

    expect(storedItem).toEqual(tabsList)
  })

  it('should get tabs from local storage', () => {
    const tabsList = [DEFAULT_IDENTIFIER, 'PAGE-1']
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tabsList))

    const storedItem = getTabsLocalStorage()

    expect(storedItem).toEqual(tabsList)
  })

  it('should set tabs to local storage and call setTabs state', () => {
    const expectedTabsList = [DEFAULT_IDENTIFIER]
    const params = {
      tabIdentifier: DEFAULT_IDENTIFIER,
      tabs: [],
      setTabs: jest.fn(),
    }

    addNewPage(params)

    const storedItem = getTabsLocalStorage()

    expect(storedItem).toEqual(expectedTabsList)
    expect(params.setTabs).toHaveBeenCalled()
  })
})
