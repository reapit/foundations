import { render } from '../../../tests/react-testing'
import React from 'react'

const mockSendFunction = jest.fn(() => Promise.resolve())

let mockModalIsOpen

const mockOpenModal = jest.fn(() => (mockModalIsOpen = true))
const mockCloseModal = jest.fn(() => (mockModalIsOpen = false))

jest.mock('@reapit/use-reapit-data', () => ({
  ...jest.requireActual('@reapit/use-reapit-data'),
  useReapitGet: jest.fn(() => [null, false, undefined, jest.fn()]),
  useReapitUpdate: jest.fn(() => [null, false, mockSendFunction]),
}))

jest.mock('@reapit/elements', () => ({
  ...jest.requireActual('@reapit/elements'),
  useModal: jest.fn(() => ({ openModal: mockOpenModal, closeModal: mockCloseModal, modalIsOpen: true })),
}))

import { UpdateNameModal } from '../update-name'

describe('FetchAuthenticators', () => {
  it('Modal should open', async () => {
    const state = render(<UpdateNameModal userId={'MOCK_ID'} name="Mock_Name" />)

    const button = await state.findByText("Update User's Name")
    button.click()

    expect(mockModalIsOpen).toBeTruthy()
    expect(mockOpenModal).toHaveBeenCalled()
  })

  it('should render component button & modal', () => {
    expect(render(<UpdateNameModal userId={'MOCK_ID'} name="Mock_Name" />)).toMatchSnapshot()
  })
})
