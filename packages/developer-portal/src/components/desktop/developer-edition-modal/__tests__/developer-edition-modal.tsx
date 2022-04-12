import React from 'react'
import { DeveloperEditionModal, handleAfterClose, handleOnConfirm } from '../developer-edition-modal'
import { render } from '../../../../tests/react-testing'
import { mockDeveloperModel } from '../../../../tests/__stubs__/developers'

describe('DeveloperEditionModal', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot when visible', () => {
    const wrapper = render(<DeveloperEditionModal visible={true} setSubscribingState={jest.fn()} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match snapshot when not visible', () => {
    const wrapper = render(<DeveloperEditionModal visible={false} setSubscribingState={jest.fn()} />)
    expect(wrapper).toMatchSnapshot()
  })

  describe('handleOnConfirm', () => {
    it('should correctly handle creating a sub', async () => {
      const developer = { id: mockDeveloperModel.id, name: mockDeveloperModel.name, email: mockDeveloperModel.email }
      const createSubscription = jest.fn(() => new Promise<boolean>((resolve) => resolve(true)))
      const setSelectedDeveloper = jest.fn()
      const setSuccess = jest.fn()

      const curried = handleOnConfirm(developer, createSubscription, setSelectedDeveloper, setSuccess)

      await curried()

      expect(createSubscription).toHaveBeenCalledTimes(1)
      expect(setSelectedDeveloper).toHaveBeenCalledTimes(1)
      expect(setSuccess).toHaveBeenCalledTimes(1)
    })
  })

  describe('handleAfterClose', () => {
    it('should correctly handle close', () => {
      const setSuccess = jest.fn()

      handleAfterClose(setSuccess)()

      expect(setSuccess).toHaveBeenCalledWith(false)
    })
  })
})
