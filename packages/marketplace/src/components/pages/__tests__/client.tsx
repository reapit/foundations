import * as React from 'react'
import { Provider } from 'react-redux'
import { shallow, mount } from 'enzyme'
import { appsDataStub, featuredAppsDataStub } from '@/sagas/__stubs__/apps'
import { ReduxState } from '@/types/core'
import { ClientItem } from '@/reducers/client'
import {
  Client,
  ClientProps,
  mapStateToProps,
  mapDispatchToProps,
  handleAfterClose,
  handleOnChange,
  handleOnCardClick,
  onCardClickParams,
} from '../client'
import { addQuery } from '@/utils/client-url-params'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { RouteComponentProps, StaticContext } from 'react-router'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import ClientWelcomeMessageModal from '@/components/ui/client-welcome-message'
import store from '@/core/store'
import { BrowserRouter as Router } from 'react-router-dom'

const routerProps = {
  match: {
    params: {
      page: '2',
    },
  },
  location: {
    search: 'page=1',
  },
} as RouteComponentProps<any, StaticContext, any>

const props = (loading: boolean): ClientProps => ({
  clientState: {
    loading: loading,
    clientData: {
      featuredApps: featuredAppsDataStub.data,
      apps: appsDataStub,
    } as ClientItem,
  },
  appDetail: {
    appDetailData: appDetailDataStub,
    loading: false,
    error: false,
    authentication: {
      loading: false,
      code: '',
    },
    isStale: false,
  },
  clientId: '1',
  setStateViewBrowse: jest.fn(),
  installationsFormState: 'PENDING',
  installationsSetFormState: jest.fn(),
  fetchAppDetail: jest.fn(),
  ...routerProps,
})

describe('Client', () => {
  it('should match a snapshot when LOADING false', () => {
    expect(shallow(<Client {...props(false)} />)).toMatchSnapshot()
  })

  it('should match a snapshot when LOADING true', () => {
    expect(shallow(<Client {...props(true)} />)).toMatchSnapshot()
  })

  it('should match a snapshot when featured apps is empty []', () => {
    const routerProps = {
      match: {
        params: {
          page: '2',
        },
      },
      location: {
        search: 'page=1',
      },
    } as RouteComponentProps<any, StaticContext, any>

    const props: ClientProps = {
      clientState: {
        loading: false,
        clientData: {
          featuredApps: [] as AppSummaryModel[],
          apps: appsDataStub,
        } as ClientItem,
      },
      appDetail: {
        appDetailData: appDetailDataStub,
        loading: false,
        error: false,
        authentication: {
          loading: false,
          code: '',
        },
        isStale: false,
      },
      clientId: '1',
      installationsFormState: 'PENDING',
      setStateViewBrowse: jest.fn(),
      installationsSetFormState: jest.fn(),
      fetchAppDetail: jest.fn(),
      ...routerProps,
    }

    expect(shallow(<Client {...props} />)).toMatchSnapshot()
  })

  it('should match a snapshot when featured apps is undefined', () => {
    const props: ClientProps = {
      clientState: {
        loading: false,
        clientData: {
          featuredApps: undefined,
          apps: appsDataStub,
        } as ClientItem,
      },
      appDetail: {
        appDetailData: appDetailDataStub,
        loading: false,
        error: false,
        authentication: {
          loading: false,
          code: '',
        },
        isStale: false,
      },
      clientId: '1',
      installationsFormState: 'PENDING',
      setStateViewBrowse: jest.fn(),
      installationsSetFormState: jest.fn(),
      fetchAppDetail: jest.fn(),
      ...routerProps,
    }

    expect(shallow(<Client {...props} />)).toMatchSnapshot()
  })

  describe('mapStateToProps', () => {
    it('should return correctly', () => {
      const mockState = {
        client: {
          clientData: {
            featuredApps: featuredAppsDataStub.data,
            apps: appsDataStub,
          },
        },
        appDetail: {
          appDetailData: appDetailDataStub,
          error: false,
          loading: false,
        },
        auth: {
          loginSession: {
            loginIdentity: {
              clientId: 'ABC',
            },
          },
        },
        installations: {
          formState: 'PENDING',
        },
      } as ReduxState
      const output = {
        clientState: mockState.client,
        appDetail: mockState.appDetail,
        clientId: 'ABC',
        installationsFormState: 'PENDING',
      }
      const result = mapStateToProps(mockState)
      expect(result).toEqual(output)
    })
  })

  describe('mapDispatchToProps', () => {
    it('should call fetchAppDetail correctly', () => {
      const mockDispatch = jest.fn()
      const { fetchAppDetail } = mapDispatchToProps(mockDispatch)
      fetchAppDetail('123', 'ABC')
      expect(mockDispatch).toBeCalled()
    })
    it('should call installationsSetFormState correctly', () => {
      const mockDispatch = jest.fn()
      const { installationsSetFormState } = mapDispatchToProps(mockDispatch)
      installationsSetFormState('SUCCESS')
      expect(mockDispatch).toBeCalled()
    })
  })

  describe('handleOnChange', () => {
    it('should call push correctly', () => {
      const mockHistory = {
        push: jest.fn(),
      }
      const fn = handleOnChange(mockHistory)
      fn(1)
      expect(mockHistory.push).toBeCalledWith(addQuery({ page: 1 }))
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
      const mockProps: onCardClickParams = {
        setVisible: jest.fn(),
        appDetail: {
          authentication: {
            loading: false,
            code: '200',
          },
          error: false,
          loading: false,
          appDetailData: {
            data: appsDataStub.data.data![0],
          },
          isStale: true,
        },
        setStateViewBrowse: jest.fn(),
        fetchAppDetail: jest.fn(),
        clientId: 'ABC',
      }
      const fn = handleOnCardClick(mockProps)
      fn({ id: '1' })
      expect(mockProps.setVisible).toBeCalled()
      expect(mockProps.fetchAppDetail).toBeCalled()
    })
  })

  describe('show welcome modal when firstLogin', () => {
    it('should run correctly', () => {
      const wrapper = mount(
        <Provider store={store.reduxStore}>
          <Router>
            <Client {...props(false)} />
          </Router>
        </Provider>,
      )
      setTimeout(() => {
        expect(wrapper.find(<ClientWelcomeMessageModal visible={true} onAccept={jest.fn()} />)).toEqual(1)
      }, 200)
    })
  })
})
