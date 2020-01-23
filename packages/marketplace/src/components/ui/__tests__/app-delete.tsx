import React from 'react'
import { shallow } from 'enzyme'
import { DeleteAppModal, AppDeleteProps, handleAfterClose, mapDispatchToProps, mapStateToProps } from '../app-delete'
import { ReduxState } from '@/types/core'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'

describe('app-delete', () => {
  it('should match snapshot', () => {
    const mockProps = {
      appId: '1',
      appName: 'test',
      formState: 'PENDING',
      afterClose: jest.fn(),
      visible: true,
      appDeleteRequest: jest.fn(),
      onDeleteSuccess: jest.fn()
    } as AppDeleteProps
    const wrapper = shallow(<DeleteAppModal {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })
  describe('handleAfterClose', () => {
    it('should call onDeleteSuccess', () => {
      const mockProps = {
        isSuccedded: true,
        onDeleteSuccess: jest.fn(),
        isLoading: true,
        afterClose: jest.fn()
      }
      const fn = handleAfterClose(mockProps)
      fn()
      expect(mockProps.onDeleteSuccess).toBeCalled()
    })

    it('should call afterClose', () => {
      const mockProps = {
        isSuccedded: false,
        onDeleteSuccess: jest.fn(),
        isLoading: false,
        afterClose: jest.fn()
      }
      const fn = handleAfterClose(mockProps)
      fn()
      expect(mockProps.afterClose).toBeCalled()
    })
  })

  describe('mapDispatchToProps', () => {
    it('should run correctly', () => {
      const mockDispatch = jest.fn()
      const { appDeleteRequest } = mapDispatchToProps(mockDispatch)
      appDeleteRequest('1')
      expect(mockDispatch).toBeCalled()
    })
  })

  describe('mapStateToProps', () => {
    it('should run correctly', () => {
      const mockState = {
        appDelete: {
          formState: 'PENDING'
        },
        appDetail: {
          appDetailData: appDetailDataStub
        }
      } as ReduxState
      const mockOwnProps = {
        appId: '1',
        appName: 'test',
        onDeleteSuccess: jest.fn()
      }
      const result = mapStateToProps(mockState, mockOwnProps)
      const output = {
        formState: 'PENDING',
        appId: '1',
        appName: 'test',
        onDeleteSuccess: mockOwnProps.onDeleteSuccess
      }
      expect(result).toEqual(output)
    })
  })
})
