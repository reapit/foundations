import React from 'react'
import { shallow } from 'enzyme'
import AdminStats from '../admin-stats'

describe('Admin Stats', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<AdminStats />)
    expect(wrapper).toMatchSnapshot()
  })

  describe('setArea APPS', () => {
    const wrapper = shallow(<AdminStats />)
    const button = wrapper.find('[dataTest="area-apps-btn"]')
    button.simulate('click')

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('button APPS should have variant primary', () => {
      expect(button.prop('variant')).toEqual('primary')
    })
  })

  describe('setArea DEVELOPRES', () => {
    const wrapper = shallow(<AdminStats />)
    wrapper.find('[dataTest="area-developers-btn"]').simulate('click')

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('button DEVELOPERS should have variant primary', () => {
      expect(wrapper.find('[dataTest="area-developers-btn"]').prop('variant')).toEqual('primary')
    })
  })

  describe('setArea INSTALLATIONS', () => {
    const wrapper = shallow(<AdminStats />)
    wrapper.find('[dataTest="area-installations-btn"]').simulate('click')

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('button INSTALLATIONS should have variant primary', () => {
      expect(wrapper.find('[dataTest="area-installations-btn"]').prop('variant')).toEqual('primary')
    })
  })

  describe('setRange WEEK', () => {
    const wrapper = shallow(<AdminStats />)
    wrapper.find('[dataTest="range-week-btn"]').simulate('click')

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('button LAST WEEK should have variant primary', () => {
      expect(wrapper.find('[dataTest="range-week-btn"]').prop('variant')).toEqual('primary')
    })
  })

  describe('setRange MONTH', () => {
    const wrapper = shallow(<AdminStats />)
    wrapper.find('[dataTest="range-month-btn"]').simulate('click')

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('button LAST MONTH should have variant primary', () => {
      expect(wrapper.find('[dataTest="range-month-btn"]').prop('variant')).toEqual('primary')
    })
  })

  describe('setRange ALL', () => {
    const wrapper = shallow(<AdminStats />)
    wrapper.find('[dataTest="range-all-btn"]').simulate('click')

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('button ALL TIME should have variant primary', () => {
      expect(wrapper.find('[dataTest="range-all-btn"]').prop('variant')).toEqual('primary')
    })
  })
})
