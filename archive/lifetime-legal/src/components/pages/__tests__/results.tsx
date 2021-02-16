import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { PagedResultContactModel_ } from '@reapit/foundations-ts-definitions'
import {
  Result,
  ResultProps,
  mapStateToProps,
  mapDispatchToProps,
  handleUseEffect,
  backToHome,
  handleRedirectToRow,
  generateColumn,
  handleUseCallback,
} from '../results'
import { contacts } from '@/sagas/__stubs__/contacts'
import { ReduxState } from '@/types/core'
import { ContactsParams } from '@/actions/results'
import Routes from '@/constants/routes'

const defaultSearch = { name: '1' }

const props = (
  loading: boolean,
  contacts: PagedResultContactModel_ | null,
  search: any = defaultSearch,
): ResultProps => ({
  resultsState: {
    loading: loading,
    search,
    contacts: contacts,
  },
  fetchContacts: jest.fn(),
  // @ts-ignore: just pick the needed props for the test
  location: {
    state: {},
  },
})

describe('Result', () => {
  it('should match a snapshot when LOADING true', () => {
    expect(toJson(shallow(<Result {...props(true, null)} />))).toMatchSnapshot()
  })

  it('should match a snapshot when LOADING false', () => {
    expect(toJson(shallow(<Result {...props(false, contacts)} />))).toMatchSnapshot()
  })

  it('should match a snapshot when no results found', () => {
    expect(toJson(shallow(<Result {...props(false, {}, '')} />))).toMatchSnapshot()
  })

  describe('mapStateToProps', () => {
    it('should run correctly', () => {
      const mockState = {
        results: {
          loading: true,
          search: {},
          contacts: contacts,
        },
      } as Pick<ReduxState, 'results'>
      const output = {
        resultsState: mockState.results,
      }
      const result = mapStateToProps(mockState as ReduxState)
      expect(result).toEqual(output)
    })
  })

  describe('mapDispatchToProps', () => {
    it('should run correctly', () => {
      const mockDispatch = jest.fn()
      const mockParams = {
        pageNumber: 1,
      } as ContactsParams
      const { fetchContacts } = mapDispatchToProps(mockDispatch)
      fetchContacts(mockParams)
      expect(mockDispatch).toBeCalled()
    })
  })

  describe('handleUseEffect', () => {
    it('should run correctly', () => {
      const fetchContacts = jest.fn()
      const pageNumber = 1
      const search = {}
      const fn = handleUseEffect({ fetchContacts, pageNumber, search })
      fn()
      expect(fetchContacts).toBeCalled()
    })
  })

  describe('backToHome', () => {
    it('should run correctly', () => {
      const mockHistory = {
        push: jest.fn(),
      }
      const fn = backToHome(mockHistory)
      fn()
      expect(mockHistory.push).toBeCalled()
    })
  })

  describe('handleRedirectToRow', () => {
    it('should run correctly', () => {
      const mockHistory = {
        push: jest.fn(),
      }
      const mockRow = {
        original: {
          id: 1,
        },
      }
      const fn = handleRedirectToRow(mockHistory, mockRow)
      fn()
      expect(mockHistory.push).toBeCalledWith(`${Routes.PROFILE}/${mockRow.original.id}`)
    })
  })

  describe('generateColumn', () => {
    it('should run correctly', () => {
      const mockHistory = {
        push: jest.fn(),
      }
      const fn = generateColumn(mockHistory)
      const result = fn()
      expect(result).toHaveLength(5)
    })
  })

  describe('handleUseCallback', () => {
    it('should run correctly', () => {
      const mockSetPageNumber = jest.fn()
      const fn = handleUseCallback(mockSetPageNumber)
      fn(1)
      expect(mockSetPageNumber).toHaveBeenCalledWith(1)
    })
  })
})
