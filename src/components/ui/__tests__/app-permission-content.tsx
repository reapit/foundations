import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { AppPermissionInnerProps, AppPermissionContent } from '../app-permission/app-permission-content'

describe('AppDetailModal', () => {
  it('should match a snapshot when appInstallFormState = DONE', () => {
    const props: AppPermissionInnerProps = {
      requestInstall: jest.fn(),
      permissions: [{ description: 'test', name: 'tets' }],
      appInstallFormState: 'DONE'
    }

    expect(toJson(shallow(<AppPermissionContent {...props} />))).toMatchSnapshot()
  })
  it('should match a snapshot when appInstallFormState = ERROR', () => {
    const props: AppPermissionInnerProps = {
      requestInstall: jest.fn(),
      permissions: [{ description: 'test', name: 'tets' }],
      appInstallFormState: 'ERROR'
    }

    expect(toJson(shallow(<AppPermissionContent {...props} />))).toMatchSnapshot()
  })
  it('should match a snapshot when appInstallFormState = PENDING', () => {
    const props: AppPermissionInnerProps = {
      requestInstall: jest.fn(),
      permissions: [{ description: 'test', name: 'tets' }],
      appInstallFormState: 'PENDING'
    }

    expect(toJson(shallow(<AppPermissionContent {...props} />))).toMatchSnapshot()
  })
  it('should match a snapshot when appInstallFormState = SUBMITTING', () => {
    const props: AppPermissionInnerProps = {
      requestInstall: jest.fn(),
      permissions: [{ description: 'test', name: 'tets' }],
      appInstallFormState: 'SUBMITTING'
    }

    expect(toJson(shallow(<AppPermissionContent {...props} />))).toMatchSnapshot()
  })
  it('should match a snapshot when appInstallFormState = SUCCESS', () => {
    const props: AppPermissionInnerProps = {
      requestInstall: jest.fn(),
      permissions: [{ description: 'test', name: 'tets' }],
      appInstallFormState: 'SUCCESS'
    }

    expect(toJson(shallow(<AppPermissionContent {...props} />))).toMatchSnapshot()
  })
})
