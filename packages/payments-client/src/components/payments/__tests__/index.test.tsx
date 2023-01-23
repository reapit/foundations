import React from 'react'
import { render } from '../../../tests/react-testing'
import { handleOpenModal, PaymentsPage, PropertyCell, StatusCell } from '..'
import { mockPropertyModel, mockPropertyModelPagedResult } from '../../../tests/__mocks__/property'
import { mockPaymentModel, mockPaymentModelPagedResult } from '../../../tests/__mocks__/payment'
import { useReapitGet } from '@reapit/use-reapit-data'

jest.mock('@reapit/use-reapit-data', () => ({
  ...jest.requireActual('@reapit/use-reapit-data'),
  useReapitGet: jest.fn(() => [null, false]),
}))

const mockUseReapitGet = useReapitGet as jest.Mock

describe('PaymentsPage ', () => {
  it('should match a snapshot where fetched but no payments', () => {
    expect(render(<PaymentsPage />)).toMatchSnapshot()
  })

  it('should match a snapshot where has payments list', () => {
    mockUseReapitGet
      .mockReturnValueOnce([mockPaymentModelPagedResult, false])
      .mockReturnValueOnce([mockPropertyModelPagedResult, false])
    expect(render(<PaymentsPage />)).toMatchSnapshot()
  })

  it('should match a snapshot where loading', () => {
    mockUseReapitGet.mockReturnValueOnce([null, true]).mockReturnValueOnce([null, true])
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

describe('handleOpenModal', () => {
  it('should correctly open the modal and set a payment', () => {
    const setSelectedPayment = jest.fn()
    const openModal = jest.fn()

    const curried = handleOpenModal(openModal, setSelectedPayment, mockPaymentModel)

    curried()

    expect(setSelectedPayment).toHaveBeenCalledWith(mockPaymentModel)
    expect(openModal).toHaveBeenCalledTimes(1)
  })
})
