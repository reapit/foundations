import React from 'react'
import { shallow } from 'enzyme'
import { getMockRouterProps } from '@/utils/mock-helper'
import Routes from '@/constants/routes'
import DeveloperManageApp from '../app-management'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import {
  onAppDeleteModalAfterClose,
  onDeleteSuccess,
  onAppRevisionModalAfterClose,
  onPendingRevisionButtonClick,
  onEditDetailButtonClick,
  onDeleteAppButtonClick,
} from '../app-management'

describe('ManageApp', () => {
  const { history } = getMockRouterProps({})

  it('should match snapshot', () => {
    expect(
      shallow(<DeveloperManageApp id="test" pendingRevisions={false} appDetailState={appDetailDataStub} />),
    ).toMatchSnapshot()
  })

  describe('onAppDeleteModalAfterClose', () => {
    it('should be called correctly', () => {
      const mockFunction = jest.fn()
      const fn = onAppDeleteModalAfterClose(mockFunction)
      fn()
      expect(mockFunction).toBeCalledWith(false)
    })
  })

  describe('onDeleteSuccess', () => {
    it('should be called correctly', () => {
      const fn = onDeleteSuccess(history)
      fn()
      expect(history.push).toBeCalledWith(Routes.APPS)
    })
  })

  describe('onAppRevisionModalAfterClose', () => {
    it('should be called correctly', () => {
      const mockFunction = jest.fn()
      const fn = onAppRevisionModalAfterClose(mockFunction)
      fn()
      expect(mockFunction).toBeCalledWith(false)
    })
  })

  describe('onPendingRevisionButtonClick', () => {
    it('should be called correctly', () => {
      const mockFunction = jest.fn()
      const fn = onPendingRevisionButtonClick(mockFunction)
      fn()
      expect(mockFunction).toBeCalledWith(true)
    })
  })

  describe('onEditDetailButtonClick', () => {
    it('should be called correctly', () => {
      const mockAppId = '1'
      const fn = onEditDetailButtonClick(history, mockAppId)
      fn()
      expect(history.push).toBeCalledWith(`${Routes.APPS}/${mockAppId}/edit`)
    })
  })

  describe('onDeleteAppButtonClick', () => {
    it('should be called correctly', () => {
      const mockFunction = jest.fn()
      const fn = onDeleteAppButtonClick(mockFunction)
      fn()
      expect(mockFunction).toBeCalledWith(true)
    })
  })
})
