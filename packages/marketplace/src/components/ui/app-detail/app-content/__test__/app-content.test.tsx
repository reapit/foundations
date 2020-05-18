import * as React from 'react'
import { shallow } from 'enzyme'
import AppContent, {
  AppContentProps,
  SlickButtonNav,
  handleShowApiKey,
  handleCopyAlert,
  renderShowApiKeyForWebComponent,
} from '../app-content'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'

const mockProps: AppContentProps = {
  appDetailData: {
    ...appDetailDataStub.data,
    apiKey: '',
  },
  loginType: 'CLIENT',
}

describe('AppContent', () => {
  it('should match a snapshot', () => {
    expect(shallow(<AppContent {...mockProps} />)).toMatchSnapshot()
  })
  describe('SlickButtonNav', () => {
    it('should match snapshot', () => {
      const mockProps = {
        currentSlide: '',
        setAppDetailModalStateInstall: jest.fn(),
        slideCount: jest.fn(),
      }
      const wrapper = shallow(
        <SlickButtonNav {...mockProps}>
          <div>mockComponent</div>
        </SlickButtonNav>,
      )
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('handleShowApiKey', () => {
    it('should run correctly', () => {
      const input = { setIsShowApikey: jest.fn(), isShowApiKey: true }
      const fn = handleShowApiKey(input)
      fn()
      expect(input.setIsShowApikey).toBeCalledWith(!input.isShowApiKey)
    })
  })

  describe('handleCopyAlert', () => {
    it('should run correctly', () => {
      window.alert = jest.fn()
      handleCopyAlert()
      expect(window.alert).toBeCalledWith('Copied')
    })
  })

  describe('renderShowApiKeyForWebComponent', () => {
    it('should match snapshot when isWebComponent', () => {
      const input = {
        isWebComponent: true,
        setIsShowApikey: jest.fn(),
        isShowApiKey: true,
        apiKey: 'mockApiKey',
        isCurrentLoggedUserDeveloper: false,
      }
      const wrapper = shallow(<div>{renderShowApiKeyForWebComponent(input)}</div>)
      const apiInput = wrapper.find('[id="apiKey"]')
      expect(apiInput).toHaveLength(1)
      expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot return null', () => {
      const input = {
        isWebComponent: false,
        setIsShowApikey: jest.fn(),
        isShowApiKey: true,
        apiKey: 'mockApiKey',
        isCurrentLoggedUserDeveloper: false,
      }
      const wrapper = shallow(<div>{renderShowApiKeyForWebComponent(input)}</div>)
      const apiInput = wrapper.find('[id="apiKey"]')
      expect(apiInput).toHaveLength(0)
      expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot not show api key', () => {
      const input = {
        isWebComponent: true,
        setIsShowApikey: jest.fn(),
        isShowApiKey: false,
        apiKey: 'mockApiKey',
        isCurrentLoggedUserDeveloper: false,
      }
      const wrapper = shallow(<div>{renderShowApiKeyForWebComponent(input)}</div>)
      const apiInput = wrapper.find('[id="apiKey"]')
      expect(apiInput).toHaveLength(0)
      expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot and return null', () => {
      const input = {
        isWebComponent: true,
        setIsShowApikey: jest.fn(),
        isShowApiKey: false,
        apiKey: 'mockApiKey',
        isCurrentLoggedUserDeveloper: true,
      }
      const wrapper = shallow(<div>{renderShowApiKeyForWebComponent(input)}</div>)
      expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot and return null', () => {
      const input = {
        isWebComponent: false,
        setIsShowApikey: jest.fn(),
        isShowApiKey: false,
        apiKey: 'mockApiKey',
        isCurrentLoggedUserDeveloper: true,
      }
      const wrapper = shallow(<div>{renderShowApiKeyForWebComponent(input)}</div>)
      expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot and return null', () => {
      const input = {
        isWebComponent: true,
        setIsShowApikey: jest.fn(),
        isShowApiKey: true,
        apiKey: undefined,
        isCurrentLoggedUserDeveloper: true,
      }
      const wrapper = shallow(<div>{renderShowApiKeyForWebComponent(input)}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
