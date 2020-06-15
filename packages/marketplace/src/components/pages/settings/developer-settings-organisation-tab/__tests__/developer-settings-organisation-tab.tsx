import React from 'react'
import { shallow } from 'enzyme'
import DeveloperOrganisationTabPage, { handleToggleVisibleModal } from '../developer-settings-organisation-tab'
import * as ReactRedux from 'react-redux'

describe('DeveloperOrganisationTabPage', () => {
  it('should match snapshot when isAdmin = false', () => {
    jest.spyOn(ReactRedux as any, 'useSelector').mockReturnValue(false)
    const wrapper = shallow(<DeveloperOrganisationTabPage />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match snapshot when isAdmin = false', () => {
    jest.spyOn(ReactRedux as any, 'useSelector').mockReturnValue(true)
    const wrapper = shallow(<DeveloperOrganisationTabPage />)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('handleToggleVisibleModal', () => {
  it('should call with correct params true', () => {
    const setIsInviteModalOpen = jest.fn()
    const fn = handleToggleVisibleModal(setIsInviteModalOpen, true)
    fn()
    expect(setIsInviteModalOpen).toHaveBeenCalledWith(true)
  })

  it('should call with correct params true', () => {
    const setIsInviteModalOpen = jest.fn()
    const fn = handleToggleVisibleModal(setIsInviteModalOpen, false)
    fn()
    expect(setIsInviteModalOpen).toHaveBeenCalledWith(false)
  })
})
