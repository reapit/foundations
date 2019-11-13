import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { AppList, AppListProps } from '../app-list'
import { appsDataStub } from '@/sagas/__stubs__/apps'
import { Loader } from '@reapit/elements'
import { AppSummaryModel } from '../../../types/marketplace-api-schema'
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
    expect(toJson(shallow(<AppList {...props} />))).toMatchSnapshot()
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
})
