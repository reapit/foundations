import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { AppPermissionInnerProps, AppPermissionContent } from '../app-permission/app-permission-content'

describe('AppDetailModal', () => {
  it('should match a snapshot when appInstallFormState = DONE', () => {
    const props: AppPermissionInnerProps = {
      appName: 'mockAppName',
      setAppDetailModalStateConfirm: jest.fn(),
      afterClose: jest.fn(),
      setAppDetailModalStateView: jest.fn(),
      permissions: [{ description: 'test', name: 'tets' }]
    }

    expect(toJson(shallow(<AppPermissionContent {...props} />))).toMatchSnapshot()
  })
  it('should match a snapshot when appInstallFormState = ERROR', () => {
    const props: AppPermissionInnerProps = {
      appName: 'mockAppName',
      setAppDetailModalStateConfirm: jest.fn(),
      afterClose: jest.fn(),
      setAppDetailModalStateView: jest.fn(),
      permissions: [{ description: 'test', name: 'tets' }]
    }

    expect(toJson(shallow(<AppPermissionContent {...props} />))).toMatchSnapshot()
  }),
    it('should match a snapshot when appInstallFormState = PENDING', () => {
      const props: AppPermissionInnerProps = {
        appName: 'mockAppName',
        setAppDetailModalStateConfirm: jest.fn(),
        afterClose: jest.fn(),
        setAppDetailModalStateView: jest.fn(),
        permissions: [{ description: 'test', name: 'tets' }]
      }

      expect(toJson(shallow(<AppPermissionContent {...props} />))).toMatchSnapshot()
    }),
    it('should match a snapshot when appInstallFormState = SUBMITTING', () => {
      const props: AppPermissionInnerProps = {
        appName: 'mockAppName',
        setAppDetailModalStateConfirm: jest.fn(),
        afterClose: jest.fn(),
        setAppDetailModalStateView: jest.fn(),
        permissions: [{ description: 'test', name: 'tets' }]
      }

      expect(toJson(shallow(<AppPermissionContent {...props} />))).toMatchSnapshot()
    }),
    it('should match a snapshot when appInstallFormState = SUCCESS', () => {
      const props: AppPermissionInnerProps = {
        appName: 'mockAppName',
        setAppDetailModalStateConfirm: jest.fn(),
        afterClose: jest.fn(),
        setAppDetailModalStateView: jest.fn(),
        permissions: [{ description: 'test', name: 'tets' }]
      }

      expect(toJson(shallow(<AppPermissionContent {...props} />))).toMatchSnapshot()
    })
})
