import * as React from 'react'
import { shallow } from 'enzyme'
import { AppDetail, AppDetailProps, mapDispatchToProps } from '../app-detail'
import { setDeveloperAppModalStateDelete } from '@/actions/developer-app-modal'
import { setAppDetailModalStatePermission } from '@/actions/app-detail-modal'
import { appUninstallRequestData } from '@/actions/app-uninstall'

const props: AppDetailProps = {
  setDeveloperAppModalStateDelete: jest.fn(),
  setAppDetailModalStatePermission: jest.fn(),
  requestUninstall: jest.fn(),
  appUninstallFormState: 'PENDING',
  isCurrentLoggedUserDeveloper: true,
  isCurrentLoggedUserClient: false,
  data: {}
}

describe('AppDetailModalInner', () => {
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
