import * as React from 'react'
import { shallow } from 'enzyme'
import { Installations, InstallationsProps, mapDispatchToProps, mapStateToProps } from '../installations'
import { installationsStub } from '@/sagas/__stubs__/installations'
import { ReduxState } from '@/types/core'

const props: InstallationsProps = {
  appId: '1',
  loading: false,
  installationsData: installationsStub,
  onUninstall: jest.fn(),
  fetchInstallationsApp: jest.fn(),
  afterClose: jest.fn(),
}

describe('Installations', () => {
  it('should match a snapshot when LOADING false', () => {
    expect(shallow(<Installations {...props} />)).toMatchSnapshot()
  })

  it('should match a snapshot when LOADING true', () => {
    const newProps = { ...props, loading: true }
    expect(shallow(<Installations {...newProps} />)).toMatchSnapshot()
  })

  describe('mapStateToProps', () => {
    it('should run correctly', () => {
      const mockState = {
        installations: {
          installationsAppData: installationsStub,
          loading: false,
          formState: 'PENDING',
        },
      } as ReduxState
      const expected = {
        installationsData: installationsStub,
        loading: false,
      }
      const result = mapStateToProps(mockState)
      expect(result).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {
    const dispatch = jest.fn()
    const fn = mapDispatchToProps(dispatch)
    it('fetchInstallationsApp', () => {
      fn.fetchInstallationsApp({ appId: ['1'] })()
      expect(dispatch).toBeCalled()
    })
  })
})
