import * as React from 'react'
import { DeveloperDesktopPage, handleSetSubscribingState, handleToggleModal } from '../desktop'
import { render } from '../../../tests/react-testing'

describe('DeveloperDesktopPage', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    const wrapper = render(<DeveloperDesktopPage />)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('handleSetSubscribingState', () => {
  it('should run correctly', () => {
    const setIsDeveloperEditionModalOpen = jest.fn()
    handleSetSubscribingState(setIsDeveloperEditionModalOpen, 'CONFIRMING')()
    expect(setIsDeveloperEditionModalOpen).toBeCalledWith('CONFIRMING')
  })
})

describe('handleToggleModal', () => {
  it('should correctly set state', () => {
    const setModalVisible = jest.fn()
    handleToggleModal(setModalVisible, true)()
    expect(setModalVisible).toBeCalledWith(false)
  })
})
