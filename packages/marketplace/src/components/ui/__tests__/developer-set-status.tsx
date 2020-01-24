import React from 'react'
import { shallow } from 'enzyme'
import {
  SetDeveloperStatusModal,
  SetDeveloperStatusProps,
  onAfterCloseHandler,
  onSuccessHandler,
} from '../developer-set-status'

describe('SetDeveloperStatusModal', () => {
  it('should match snapshot', () => {
    const props = {
      developer: { id: '', isInactive: false },
      developerName: '',
      onSuccess: () => jest.fn(),
      formState: 'PENDING',
      visible: true,
      afterClose: () => jest.fn(),
      developerSetStatusRequest: () => jest.fn(),
      resetDeveloperSetStatusReducer: () => jest.fn(),
    } as SetDeveloperStatusProps

    const wrapper = shallow(<SetDeveloperStatusModal {...props} />)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('onAfterCloseHandler', () => {
  it('should return a function when executing', () => {
    const mockAfterClose = jest.fn()

    const onAfterCloseHandlerFn = onAfterCloseHandler({ afterClose: mockAfterClose, isLoading: false })
    expect(onAfterCloseHandlerFn).toBeDefined()

    onAfterCloseHandlerFn()
    expect(mockAfterClose).toBeCalled()
  })
})

describe('onSuccessHandler', () => {
  it('should return a function when executing', () => {
    const mockOnSuccess = jest.fn()
    const mockResetDeveloperSetStatusReducer = jest.fn()

    const onSuccessHandlerFn = onSuccessHandler({
      onSuccess: mockOnSuccess,
      resetDeveloperSetStatusReducer: mockResetDeveloperSetStatusReducer,
    })
    expect(onSuccessHandlerFn).toBeDefined()

    onSuccessHandlerFn()
    expect(mockOnSuccess).toBeCalled()
    expect(mockResetDeveloperSetStatusReducer).toBeCalled()
  })
})
