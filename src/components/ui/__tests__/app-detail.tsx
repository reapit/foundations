import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { AppDetail, AppDetailProps, mapStateToProps, mapDispatchToProps } from '../app-detail'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import { setDeveloperAppModalStateDelete } from '@/actions/developer-app-modal'
import { setAppDetailModalStatePermission } from '@/actions/app-detail-modal'
import { appPermissionRequestData } from '@/actions/app-permission'
import { appUninstallRequestData } from '@/actions/app-uninstall'

const props: AppDetailProps = {
  setDeveloperAppModalStateDelete: jest.fn(),
  setAppDetailModalStatePermission: jest.fn(),
  requestUninstall: jest.fn(),
  appUninstallFormState: 'PENDING',
  isCurrentLoggedUserDeveloper: true,
  isCurrentLoggedUserClient: false,
  fetchAppPermission: jest.fn,
  data: {}
}

describe('AppDetailModalInner', () => {
  it('Should show delete app button if isCurrentLoggedUserDeveloper = true', () => {
    const modifiedProps: AppDetailProps = { ...props, isCurrentLoggedUserDeveloper: true }
    const shallowAppDetailModalInner = shallow(<AppDetail {...modifiedProps} />)
    expect(shallowAppDetailModalInner.find('[dataTest="btnAppDetailDeleteApp"]')).toHaveLength(1)
  })

  it('Should show uninstall app button if isCurrentLoggedUserClient = true and installedOn exist', () => {
    const modifiedProps: AppDetailProps = { ...props, isCurrentLoggedUserClient: true, data: { installedOn: 'yep' } }
    const shallowAppDetailModalInner = shallow(<AppDetail {...modifiedProps} />)
    expect(shallowAppDetailModalInner.find('[dataTest="btnAppDetailUninstallApp"]')).toHaveLength(1)
  })

  it('Should show install app button if isCurrentLoggedUserClient = true and installedOn not exist', () => {
    const modifiedProps: AppDetailProps = { ...props, isCurrentLoggedUserClient: true }
    const shallowAppDetailModalInner = shallow(<AppDetail {...modifiedProps} />)
    expect(shallowAppDetailModalInner.find('[data-test="btnAppDetailInstallApp"]')).toHaveLength(1)
  })

  describe('mapDispatchToProps', () => {
    it('should dispatch correctly if mapped setAppDetailModalStatePermission is called', () => {
      const mockedDispatch = jest.fn()
      const { setAppDetailModalStatePermission: mappedSetAppDetailModalStatePermission } = mapDispatchToProps(
        mockedDispatch
      )
      mappedSetAppDetailModalStatePermission()
      expect(mockedDispatch).toHaveBeenNthCalledWith(1, setAppDetailModalStatePermission())
    })

    it('should dispatch correctly if mapped fetchAppPermission is called', () => {
      const mockedDispatch = jest.fn()
      const fetchAppPermissionInput = '1'
      const { fetchAppPermission: mappedFetchAppPermission } = mapDispatchToProps(mockedDispatch)
      mappedFetchAppPermission(fetchAppPermissionInput)
      expect(mockedDispatch).toHaveBeenNthCalledWith(1, appPermissionRequestData(fetchAppPermissionInput))
    })

    it('should dispatch correctly if mapped requestUninstall is called', () => {
      const mockedDispatch = jest.fn()
      const { requestUninstall: mappedRequestUninstall } = mapDispatchToProps(mockedDispatch)
      mappedRequestUninstall()
      expect(mockedDispatch).toHaveBeenNthCalledWith(1, appUninstallRequestData())
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
