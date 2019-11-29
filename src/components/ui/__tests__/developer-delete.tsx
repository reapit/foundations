import React from 'react'
import { shallow } from 'enzyme'
import {
  DeleteDeveloperModal,
  DeveloperDeleteProps,
  onAfterCloseHandler,
  onDeleteSuccessHandler
} from '../developer-delete'

describe('DeveloperDeleteModal', () => {
  it('should match snapshot', () => {
    const props = {
      developerId: '',
      developerName: '',
      onDeleteSuccess: () => jest.fn(),
      formState: 'PENDING',
      visible: true,
      afterClose: () => jest.fn(),
      developerDeleteRequest: () => jest.fn(),
      resetDeveloperDeleteReducer: () => jest.fn()
    } as DeveloperDeleteProps

    const wrapper = shallow(<DeleteDeveloperModal {...props} />)
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

describe('onDeleteSuccessHandler', () => {
  it('should return a function when executing', () => {
    const mockOnDeleteSuccess = jest.fn()
    const mockResetDeveloperDeleteReducer = jest.fn()

    const onDeleteSuccessHandlerFn = onDeleteSuccessHandler({
      onDeleteSuccess: mockOnDeleteSuccess,
      resetDeveloperDeleteReducer: mockResetDeveloperDeleteReducer
    })
    expect(onDeleteSuccessHandlerFn).toBeDefined()

    onDeleteSuccessHandlerFn()
    expect(mockOnDeleteSuccess).toBeCalled()
    expect(mockResetDeveloperDeleteReducer).toBeCalled()
  })
})
