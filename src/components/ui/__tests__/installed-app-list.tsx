import * as React from 'react'
import { shallow } from 'enzyme'
import { InstalledAppList, InstalledAppListProps } from '../installed-app-list'
import { appsDataStub } from '@/sagas/__stubs__/apps'
import { Loader, GridFourColItem, GridThreeColItem } from '@reapit/elements'
import { AppSummaryModel } from '../../../types/marketplace-api-schema'
import InstalledAppCard from '../installed-app-card'

const props: InstalledAppListProps = {
  list: appsDataStub.data.data as AppSummaryModel[],
  loading: false,
  onCardClick: jest.fn(),
  title: 'Title',
  infoType: 'CLIENT_APPS_EMPTY',
  pagination: {
    pageNumber: 2,
    pageSize: 20,
    totalCount: 200,
    onChange: jest.fn()
  }
}

describe('InstalledAppList', () => {
  it('should match a snapshot', () => {
    expect(shallow(<InstalledAppList {...props} />)).toMatchSnapshot()
  })

  it('should match a snapshot when use empty infoType', () => {
    expect(shallow(<InstalledAppList infoType={''} {...props} />)).toMatchSnapshot()
  })

  it('should show loading', () => {
    const wrapper = shallow(<InstalledAppList {...props} loading />)
    expect(wrapper.find(Loader)).toHaveLength(1)
  })

  it('should respond to a card click event', () => {
    const wrapper = shallow(<InstalledAppList {...props} />)
    wrapper
      .find(InstalledAppCard)
      .first()
      .simulate('click', { stopPropagation: jest.fn() })
    expect(props.onCardClick).toHaveBeenCalledTimes(1)
    expect(props.onCardClick).toHaveBeenCalledWith(appsDataStub?.data?.data?.[0])
  })
})
