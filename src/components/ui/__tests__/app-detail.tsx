import * as React from 'react'
import { mount, shallow } from 'enzyme'
import { AppDetail, AppDetailProps, mapDispatchToProps, SlickButtonNav } from '../app-detail'
import { setDeveloperAppModalStateDelete } from '@/actions/developer-app-modal'
import { setAppDetailModalStateViewConfirm, setAppDetailModalStateUninstall } from '@/actions/app-detail-modal'

const props: AppDetailProps = {
  setDeveloperAppModalStateDelete: jest.fn(),
  setAppDetailModalStateViewConfirm: jest.fn(),
  setAppDetailModalStateUninstall: jest.fn(),
  appUninstallFormState: 'PENDING',
  isCurrentLoggedUserDeveloper: true,
  isCurrentLoggedUserClient: false,
  data: {},
  afterClose: jest.fn()
}

describe('AppDetailModalInner', () => {
  it('Should show uninstall app button if isCurrentLoggedUserClient = true and installedOn exist', () => {
    const modifiedProps: AppDetailProps = { ...props, isCurrentLoggedUserClient: true, data: { installedOn: 'yep' } }
    const shallowAppDetailModalInner = mount(<AppDetail {...modifiedProps} />)
    expect(shallowAppDetailModalInner.find('[dataTest="btnAppDetailUninstallApp"]')).toHaveLength(1)
  })

  it('Should show install app button if isCurrentLoggedUserClient = true and installedOn not exist', () => {
    const modifiedProps: AppDetailProps = { ...props, isCurrentLoggedUserClient: true }
    const shallowAppDetailModalInner = mount(<AppDetail {...modifiedProps} />)
    expect(shallowAppDetailModalInner.find('[dataTest="btnAppDetailInstallApp"]')).toHaveLength(1)
  })

  describe('mapDispatchToProps', () => {
    it('should dispatch correctly if mapped setAppDetailModalStateViewConfirm is called', () => {
      const mockedDispatch = jest.fn()
      const { setAppDetailModalStateViewConfirm: mappedsetAppDetailModalStateViewConfirm } = mapDispatchToProps(
        mockedDispatch
      )
      mappedsetAppDetailModalStateViewConfirm()
      expect(mockedDispatch).toHaveBeenNthCalledWith(1, setAppDetailModalStateViewConfirm())
    })

    it('should dispatch correctly if mapped requestUninstall is called', () => {
      const mockedDispatch = jest.fn()
      const { setAppDetailModalStateUninstall: mappedSetAppDetailModalStateUninstall } = mapDispatchToProps(
        mockedDispatch
      )
      mappedSetAppDetailModalStateUninstall()
      expect(mockedDispatch).toHaveBeenNthCalledWith(1, setAppDetailModalStateUninstall())
    })

    it('should dispatch correctly if mapped setDeveloperAppModalStateDelete is called', () => {
      const mockedDispatch = jest.fn()
      const { setDeveloperAppModalStateDelete: mappedSetDeveloperAppModalStateDelete } = mapDispatchToProps(
        mockedDispatch
      )
      mappedSetDeveloperAppModalStateDelete()
      expect(mockedDispatch).toHaveBeenNthCalledWith(1, setDeveloperAppModalStateDelete())
    })
  })
})

describe('SlickButtonNav', () => {
  it('should match snapshot', () => {
    const mockProps = {
      currentSlide: '',
      setAppDetailModalStateViewConfirm: jest.fn(),
      slideCount: jest.fn()
    }
    const wrapper = shallow(
      <SlickButtonNav {...mockProps}>
        <div>mockComponent</div>
      </SlickButtonNav>
    )
  })
})
