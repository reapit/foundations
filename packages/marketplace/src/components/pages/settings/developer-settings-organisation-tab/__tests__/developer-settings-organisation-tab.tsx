import React from 'react'
import { shallow } from 'enzyme'
import DeveloperOrganisationTabPage, { handleToggleVisibleModal } from '../developer-settings-organisation-tab'

describe('DeveloperOrganisationTabPage', () => {
  it('should match snapshot', () => {
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
