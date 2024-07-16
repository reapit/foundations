import React from 'react'
import { render } from '../../../tests/react-testing'
import { handleModalAction, NetworkProvider } from '../use-network-state'
import { useReapitGet } from '@reapit/use-reapit-data'
import { mockPagedCustomersModel, mockPagedIpsModel, mockPagedRulesModel } from '../../../tests/__stubs__/network'

jest.mock('@reapit/use-reapit-data', () => ({
  ...jest.requireActual('@reapit/use-reapit-data'),
  useReapitGet: jest.fn(() => [null, false, undefined, jest.fn()]),
}))

const mockUseReapitGet = useReapitGet as jest.Mock

describe('NetworkProvider', () => {
  it('should match a snapshot with no data', () => {
    expect(
      render(
        <NetworkProvider>
          <div />
        </NetworkProvider>,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot with data', () => {
    mockUseReapitGet
      .mockReturnValueOnce([mockPagedCustomersModel, false, undefined, jest.fn()])
      .mockReturnValueOnce([mockPagedRulesModel, false, undefined, jest.fn()])
      .mockReturnValueOnce([mockPagedIpsModel, false, undefined, jest.fn()])

    expect(
      render(
        <NetworkProvider>
          <div />
        </NetworkProvider>,
      ),
    ).toMatchSnapshot()
  })
})

describe('handleModalAction', () => {
  it('should handle a generic modal action and set the selected state', () => {
    const setNetworkSelected = jest.fn()
    const modalAction = jest.fn()
    const key = 'ruleId'
    const selectedItem = 'MOCK_ID'

    const curried = handleModalAction(setNetworkSelected, modalAction, key, selectedItem)

    curried()

    expect(modalAction).toHaveBeenCalledTimes(1)
    expect(setNetworkSelected.mock.calls[0][0]()[key]).toEqual(selectedItem)
  })
})
