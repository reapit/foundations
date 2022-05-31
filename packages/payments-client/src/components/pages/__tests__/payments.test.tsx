import * as React from 'react'
import { render } from '../../../tests/react-testing'
import Payments, {
  AmountCell,
  PropertyCell,
  RequestedCell,
  RequestPaymentCell,
  StatusCell,
  TakePaymentCell,
} from '../payments'
import useSWR from 'swr'
import { stubPaymentModel } from '../../ui/__stubs__/payment'
import { stubPropertyModel } from '../../ui/__stubs__/property'

jest.mock('swr')

const mockSWR = useSWR as jest.Mock
const locationMock = { search: '', pathname: '/test' }

jest.mock('react-router', () => ({
  ...(jest.requireActual('react-router') as Object),
  useHistory: () => ({ push: jest.fn() }),
  useLocation: jest.fn(() => locationMock),
}))

describe('Payments ', () => {
  it('should match a snapshot where loading', () => {
    mockSWR.mockReturnValue({
      data: null,
      error: null,
      mutate: jest.fn(),
    })
    expect(render(<Payments />)).toMatchSnapshot()
  })

  it('should match a snapshot where has payments list', () => {
    mockSWR.mockReturnValue({
      data: {
        totalCount: 1,
        pageSize: 1,
        pageNumber: 1,
        _embedded: [stubPaymentModel],
      },
      error: null,
      mutate: jest.fn(),
    })
    expect(render(<Payments />)).toMatchSnapshot()
  })

  it('should match a snapshot where payments list is empty', () => {
    mockSWR.mockReturnValue({
      data: {
        totalCount: 0,
        pageSize: 1,
        pageNumber: 1,
        _embedded: [],
      },
      error: null,
      mutate: jest.fn(),
    })
    expect(render(<Payments />)).toMatchSnapshot()
  })
})

describe('RequestedCell', () => {
  it('should match a snapshot', () => {
    expect(render(<RequestedCell cell={{ value: new Date('2020-01-01') }} />)).toMatchSnapshot()
  })
})

describe('AmountCell', () => {
  it('should match a snapshot', () => {
    expect(render(<AmountCell cell={{ value: 10000 }} />)).toMatchSnapshot()
  })

  it('should match a snapshot where no value', () => {
    expect(render(<AmountCell cell={{ value: undefined }} />)).toMatchSnapshot()
  })
})

describe('StatusCell', () => {
  it('should match a snapshot', () => {
    expect(render(<StatusCell cell={{ value: 'posted' }} />)).toMatchSnapshot()
  })

  it('should match a snapshot for default status', () => {
    expect(render(<StatusCell cell={{ value: 'rubbish' }} />)).toMatchSnapshot()
  })
})

describe('PropertyCell', () => {
  it('should match a snapshot where loading', () => {
    mockSWR.mockReturnValue({
      data: null,
      error: null,
      mutate: jest.fn(),
    })
    expect(render(<PropertyCell cell={{ value: 'posted' }} />)).toMatchSnapshot()
  })

  it('should match a snapshot for default status', () => {
    mockSWR.mockReturnValue({
      data: {
        ...stubPropertyModel,
      },
      error: null,
      mutate: jest.fn(),
    })
    expect(render(<PropertyCell cell={{ value: 'rubbish' }} />)).toMatchSnapshot()
  })
})

describe('RequestPaymentCell', () => {
  it('should match a snapshot', () => {
    const mockSetSelected = jest.fn()
    const Cell = RequestPaymentCell(mockSetSelected)
    expect(Cell({ value: stubPaymentModel.id as string, data: [stubPaymentModel] })).toMatchSnapshot()
  })
})

describe('TakePaymentCell', () => {
  it('should match a snapshot', () => {
    const mockHandleTakePayment = jest.fn()
    const Cell = TakePaymentCell(mockHandleTakePayment)
    expect(Cell({ value: stubPaymentModel.id as string, data: [stubPaymentModel] })).toMatchSnapshot()
  })
})
