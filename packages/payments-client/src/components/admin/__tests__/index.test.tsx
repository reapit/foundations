import React from 'react'
import { render } from '../../../tests/react-testing'
import AdminPage, { handleCloseModal, handleResetForm } from '..'
import { useReapitGet } from '@reapit/use-reapit-data'
import { mockConfigModel } from '../../../tests/__mocks__/config'

jest.mock('@reapit/use-reapit-data', () => ({
  ...jest.requireActual('@reapit/use-reapit-data'),
  useReapitGet: jest.fn(() => [null, false]),
}))

const mockUseReapitGet = useReapitGet as jest.Mock

describe('AdminPage', () => {
  it('should match a snapshot with no data', () => {
    expect(render(<AdminPage />)).toMatchSnapshot()
  })

  it('should match a snapshot with config data', () => {
    mockUseReapitGet.mockReturnValueOnce([mockConfigModel, false])
    expect(render(<AdminPage />)).toMatchSnapshot()
  })

  it('should match a snapshot when loading', () => {
    mockUseReapitGet.mockReturnValueOnce([null, true])
    expect(render(<AdminPage />)).toMatchSnapshot()
  })
})

describe('handleResetForm', () => {
  it('should call reset if there is a config', () => {
    const config = mockConfigModel
    const reset = jest.fn()

    const { clientCode, companyName, configId, isLive, logoUri } = config

    const curried = handleResetForm(config, false, reset)

    curried()

    expect(reset).toHaveBeenCalledWith({ clientCode, companyName, configId, isLive, logoUri })
  })
})

describe('handleCloseModal', () => {
  it('should close and refresh', () => {
    const closeModal = jest.fn()
    const shouldClose = true
    const refreshConfig = jest.fn()

    const curried = handleCloseModal(closeModal, shouldClose, refreshConfig)

    curried()

    expect(closeModal).toHaveBeenCalledTimes(1)
    expect(refreshConfig).toHaveBeenCalledTimes(1)
  })
})
