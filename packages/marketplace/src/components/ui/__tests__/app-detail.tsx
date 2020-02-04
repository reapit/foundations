import * as React from 'react'
import { shallow } from 'enzyme'
import { AppDetail, AppDetailProps, mapDispatchToProps, SlickButtonNav } from '../app-detail'
import { setDeveloperAppModalStateDelete } from '@/actions/developer-app-modal'
import { setAppDetailModalStateInstall, setAppDetailModalStateUninstall } from '@/actions/app-detail-modal'

const props: AppDetailProps = {
  setDeveloperAppModalStateDelete: jest.fn(),
  setAppDetailModalStateInstall: jest.fn(),
  setAppDetailModalStateUninstall: jest.fn(),
  isCurrentLoggedUserDeveloper: true,
  isCurrentLoggedUserClient: false,
  data: {},
  afterClose: jest.fn(),
}

describe('AppDetailModalInner', () => {
  it('should match a snapshot', () => {
    expect(shallow(<AppDetail {...props} />)).toMatchSnapshot()
  })

  describe('mapDispatchToProps', () => {
    it('should dispatch correctly if mapped setAppDetailModalStateInstall is called', () => {
      const mockedDispatch = jest.fn()
      const { setAppDetailModalStateInstall: mappedsetAppDetailModalStateViewConfirm } = mapDispatchToProps(
        mockedDispatch,
      )
      mappedsetAppDetailModalStateViewConfirm()
      expect(mockedDispatch).toHaveBeenNthCalledWith(1, setAppDetailModalStateInstall())
    })

    it('should dispatch correctly if mapped requestUninstall is called', () => {
      const mockedDispatch = jest.fn()
      const { setAppDetailModalStateUninstall: mappedSetAppDetailModalStateUninstall } = mapDispatchToProps(
        mockedDispatch,
      )
      mappedSetAppDetailModalStateUninstall()
      expect(mockedDispatch).toHaveBeenNthCalledWith(1, setAppDetailModalStateUninstall())
    })

    it('should dispatch correctly if mapped setDeveloperAppModalStateDelete is called', () => {
      const mockedDispatch = jest.fn()
      const { setDeveloperAppModalStateDelete: mappedSetDeveloperAppModalStateDelete } = mapDispatchToProps(
        mockedDispatch,
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
