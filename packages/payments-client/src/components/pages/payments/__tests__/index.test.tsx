import React from 'react'
import { render } from '../../../../tests/react-testing'
import { PaymentsPage, PropertyCell, StatusCell } from '..'
import { mockPropertyModel } from '../../../../tests/__mocks__/property'

const locationMock = { search: '', pathname: '/test' }

jest.mock('react-router', () => ({
  ...(jest.requireActual('react-router') as Object),
  useHistory: () => ({ push: jest.fn() }),
  useLocation: jest.fn(() => locationMock),
}))

describe('PaymentsPage ', () => {
  it('should match a snapshot where loading', () => {
    expect(render(<PaymentsPage />)).toMatchSnapshot()
  })

  it('should match a snapshot where has payments list', () => {
    expect(render(<PaymentsPage />)).toMatchSnapshot()
  })

  it('should match a snapshot where payments list is empty', () => {
    expect(render(<PaymentsPage />)).toMatchSnapshot()
  })
})

describe('StatusCell', () => {
  it('should match a snapshot', () => {
    expect(render(<StatusCell status="posted" />)).toMatchSnapshot()
  })

  it('should match a snapshot for default status', () => {
    expect(render(<StatusCell status="rubbish" />)).toMatchSnapshot()
  })
})

describe('PropertyCell', () => {
  it('should match a snapshot for default status', () => {
    expect(
      render(<PropertyCell properties={{ _embedded: [mockPropertyModel] }} propertyId={mockPropertyModel.id} />),
    ).toMatchSnapshot()
  })
})
