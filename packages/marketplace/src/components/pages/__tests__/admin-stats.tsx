import React from 'react'
import { shallow } from 'enzyme'
import { AdminStats, AdminStatsProps, mapDispatchToProps } from '../admin-stats'
import { Loader, H4 } from '@reapit/elements'
import { Line } from 'react-chartjs-2'

const adminProps: AdminStatsProps = {
  loading: false,
  data: [],
  totalCount: 0,
  loadStats: jest.fn()
}

describe('Admin Stats', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<AdminStats {...adminProps} />)
    expect(wrapper).toMatchSnapshot()
  })

  describe('setArea APPS', () => {
    const wrapper = shallow(<AdminStats {...adminProps} />)
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
    const wrapper = shallow(<AdminStats {...adminProps} />)
    wrapper.find('[dataTest="area-developers-btn"]').simulate('click')

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('button DEVELOPERS should have variant primary', () => {
      expect(wrapper.find('[dataTest="area-developers-btn"]').prop('variant')).toEqual('primary')
    })
  })

  describe('setArea INSTALLATIONS', () => {
    const wrapper = shallow(<AdminStats {...adminProps} />)
    wrapper.find('[dataTest="area-installations-btn"]').simulate('click')

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('button INSTALLATIONS should have variant primary', () => {
      expect(wrapper.find('[dataTest="area-installations-btn"]').prop('variant')).toEqual('primary')
    })
  })

  describe('setRange WEEK', () => {
    const wrapper = shallow(<AdminStats {...adminProps} />)
    wrapper.find('[dataTest="range-week-btn"]').simulate('click')

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('button LAST WEEK should have variant primary', () => {
      expect(wrapper.find('[dataTest="range-week-btn"]').prop('variant')).toEqual('primary')
    })
  })

  describe('setRange MONTH', () => {
    const wrapper = shallow(<AdminStats {...adminProps} />)
    wrapper.find('[dataTest="range-month-btn"]').simulate('click')

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('button LAST MONTH should have variant primary', () => {
      expect(wrapper.find('[dataTest="range-month-btn"]').prop('variant')).toEqual('primary')
    })
  })

  describe('setRange ALL', () => {
    const wrapper = shallow(<AdminStats {...adminProps} />)
    wrapper.find('[dataTest="range-all-btn"]').simulate('click')

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('button ALL TIME should have variant primary', () => {
      expect(wrapper.find('[dataTest="range-all-btn"]').prop('variant')).toEqual('primary')
    })
  })

  describe('renderResult', () => {
    it('should show loading', () => {
      const wrapper = shallow(<AdminStats {...adminProps} loading={true} />)
      expect(wrapper.find(Loader).length).toEqual(1)
    })

    it('should show ALL result', () => {
      const wrapper = shallow(<AdminStats {...adminProps} />)
      wrapper.find('[dataTest="range-all-btn"]').simulate('click')
      setTimeout(() => {
        expect(
          wrapper
            .find(H4)
            .last()
            .text()
        ).toContain('Total')
      }, 1000)
    })

    it('should show ALL result', () => {
      const wrapper = shallow(<AdminStats {...adminProps} />)
      wrapper.find('[dataTest="range-week-btn"]').simulate('click')
      setTimeout(() => {
        expect(wrapper.find(Line).length).toEqual(1)
      }, 1000)
    })
  })

  describe('mapDispatchToProps', () => {
    it('should call dispatch correctly', () => {
      const mockDispatch = jest.fn()
      const { loadStats } = mapDispatchToProps(mockDispatch)
      loadStats({ area: 'APPS', range: 'WEEK' })
      expect(mockDispatch).toBeCalled()
    })
  })
})
