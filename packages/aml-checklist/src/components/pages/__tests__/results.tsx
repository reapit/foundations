import * as React from 'react'
import { render } from '../../../tests/react-testing'
import { ContactModelPagedResult } from '@reapit/foundations-ts-definitions'
import {
  Result,
  ResultProps,
  mapStateToProps,
  mapDispatchToProps,
  generateColumns,
  generateSearchTitle,
  fnChangePage,
  fnFetchContacts,
} from '../results'
import { contacts } from '@/sagas/__stubs__/contacts'
import { ReduxState } from '@/types/core'
import { SearchParams } from '@/actions/result'

const props = (search: SearchParams, contacts: ContactModelPagedResult | null): ResultProps => ({
  resultState: {
    loading: false,
    search: search,
    contacts: contacts,
  },
  fetchContacts: jest.fn(),
  // @ts-ignore: just pick the needed props for the test
  history: {},
})

describe('Result', () => {
  it('should match a snapshot when LOADING true', () => {
    expect(render(<Result {...props({}, null)} />)).toMatchSnapshot()
  })

  it('should match a snapshot when LOADING false', () => {
    expect(render(<Result {...props({ name: '1' }, contacts)} />)).toMatchSnapshot()
  })

  describe('generateColumn', () => {
    it('should run correctly', () => {
      const mockHistory = {
        push: jest.fn(),
      }
      const fn = generateColumns(mockHistory)
      const result = fn()
      expect(result).toHaveLength(5)
    })
  })

  describe('generateSearchTitle', () => {
    it('should run correctly', () => {
      const mockSearch = { name: '1' } as SearchParams

      const fn = generateSearchTitle(mockSearch)
      const result = fn()
      expect(result).toEqual('1')
    })
  })

  describe('fnChangePage', () => {
    it('should run correctly', () => {
      const mockSetPageNumber = jest.fn()
      const fn = fnChangePage(mockSetPageNumber)
      fn(1)
      expect(mockSetPageNumber).toHaveBeenCalledWith(1)
    })
  })

  describe('fnFetchContacts', () => {
    it('should run correctly', () => {
      const fetchContacts = jest.fn()
      const pageNumber = 1
      const search = {}
      fnFetchContacts(search, pageNumber, fetchContacts)()
      expect(fetchContacts).toBeCalled()
    })
  })

  describe('mapStateToProps', () => {
    it('should run correctly', () => {
      // @ts-ignore: only pick necessary props
      const mockState = {
        result: {
          loading: false,
          search: { name: 'a' },
          contacts,
        },
      } as ReduxState
      const result = mapStateToProps(mockState)
      expect(result).toEqual({
        resultState: {
          contacts,
          loading: false,
          search: { name: 'a' },
        },
      })
    })
  })

  describe('mapDispatchToProps', () => {
    it('should render correctly', () => {
      const mockDispatch = jest.fn()
      const { fetchContacts } = mapDispatchToProps(mockDispatch)
      fetchContacts({ name: 'a', pageNumber: 1 })
      expect(mockDispatch).toBeCalled()
    })
  })
})
