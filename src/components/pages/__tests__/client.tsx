import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { appsDataStub } from '@/sagas/__stubs__/apps'
import { ReduxState } from '@/types/core'
import routes from '@/constants/routes'
import {
  Client,
  ClientProps,
  mapStateToProps,
  mapDispatchToProps,
  handleAfterClose,
  handleOnChange,
  handleOnCardClick
} from '../client'

describe('Client', () => {
  it('should match a snapshot', () => {
    const props: ClientProps = {
      clientState: {
        loading: false,
        clientData: appsDataStub
      },
      // @ts-ignore: just pick the needed props for the test
      match: {
        params: {
          page: '2'
        }
      }
    }
    expect(toJson(shallow(<Client {...props} />))).toMatchSnapshot()
  })

  it('should match a snapshot', () => {
    const props: ClientProps = {
      clientState: {
        loading: true,
        clientData: appsDataStub
      },
      // @ts-ignore: just pick the needed props for the test
      match: {
        params: {
          page: '2'
        }
      }
    }
    expect(toJson(shallow(<Client {...props} />))).toMatchSnapshot()
  })

  describe('mapStateToProps', () => {
    it('should return correctly', () => {
      const mockState = {
        client: {},
        appDetail: {},
        auth: {
          loginSession: {
            loginIdentity: {
              clientId: 'ABC'
            }
          }
        }
      } as ReduxState
      const output = {
        clientState: mockState.client,
        appDetail: mockState.appDetail,
        clientId: 'ABC'
      }
      const result = mapStateToProps(mockState)
      expect(result).toEqual(output)
    })
  })

  describe('mapDispatchToProps', () => {
    it('should call dispatch correctly', () => {
      const mockDispatch = jest.fn()
      const { fetchAppDetail } = mapDispatchToProps(mockDispatch)
      fetchAppDetail('123', 'ABC')
      expect(mockDispatch).toBeCalled()
    })
  })

  describe('handleOnChange', () => {
    it('should call push correctly', () => {
      const mockHistory = {
        push: jest.fn()
      }
      const fn = handleOnChange(mockHistory)
      fn(1)
      expect(mockHistory.push).toBeCalledWith(`${routes.CLIENT}/${1}`)
    })
  })

  describe('handleAfterClose', () => {
    const setVisible = jest.fn()
    const fn = handleAfterClose({ setVisible })
    fn()
    expect(setVisible).toBeCalledWith(false)
  })

  describe('handleOnCardClick', () => {
    it('should run correctly', () => {
      const mockProps = {
        setVisible: jest.fn(),
        appDetail: {
          appDetailData: appsDataStub.data
        },
        fetchAppDetail: jest.fn(),
        clientId: 'ABC'
      }
      const fn = handleOnCardClick(mockProps)
      fn({ id: '1' })
      expect(mockProps.setVisible).toBeCalled()
      expect(mockProps.fetchAppDetail).toBeCalled()
    })
  })
})
