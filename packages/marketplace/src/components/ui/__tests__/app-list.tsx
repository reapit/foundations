import * as React from 'react'
import { shallow } from 'enzyme'

import { AppList, AppListProps } from '../app-list'
import { appsDataStub } from '@/sagas/__stubs__/apps'
import { Loader, GridFourColItem, GridThreeColItem, Helper } from '@reapit/elements'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import AppCard from '../app-card'

const props: AppListProps = {
  list: appsDataStub.data.data as AppSummaryModel[],
  loading: false,
  onCardClick: jest.fn(),
  onSettingsClick: jest.fn(),
  title: 'Title',
  infoType: 'CLIENT_APPS_EMPTY',
  pagination: {
    pageNumber: 2,
    pageSize: 20,
    totalCount: 200,
    onChange: jest.fn()
  }
}

describe('AppList', () => {
  it('should match a snapshot', () => {
    expect(shallow(<AppList {...props} />)).toMatchSnapshot()
  })

  it('should match a snapshot when use empty infoType', () => {
    expect(shallow(<AppList infoType={''} {...props} />)).toMatchSnapshot()
  })

  it('should show loading', () => {
    const wrapper = shallow(<AppList {...props} loading />)
    expect(wrapper.find(Loader)).toHaveLength(1)
  })

  it('should respond to a card click event', () => {
    const wrapper = shallow(<AppList {...props} />)
    wrapper
      .find(AppCard)
      .first()
      .simulate('click', { stopPropagation: jest.fn() })
    expect(props.onCardClick).toHaveBeenCalledTimes(1)
    expect(props.onCardClick).toHaveBeenCalledWith(appsDataStub?.data?.data?.[0])
  })

  it('should default contain GridFourColItem', () => {
    const wrapper = shallow(<AppList {...props} />)
    expect(wrapper.find(GridFourColItem).length).toBeGreaterThan(0)
  })

  it('should contain GridThreeColItem', () => {
    const wrapper = shallow(<AppList numOfColumn={3} {...props} />)
    expect(wrapper.find(GridThreeColItem).length).toBeGreaterThan(0)
  })

  it('should match the empty search message', () => {
    const emptyListProps: AppListProps = { ...props, list: [], infoType: '' }
    const wrapper = shallow(<AppList {...emptyListProps} />)
    const EMPTY_SEARCH_MESSAGE = 'We are unable to find any Apps that match your search criteria. Please try again.'

    const alert = wrapper.find(Helper).dive()

    expect(alert.text()).toBe(EMPTY_SEARCH_MESSAGE)
  })
})
