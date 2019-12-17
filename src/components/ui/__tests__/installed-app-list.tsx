import * as React from 'react'
import { shallow } from 'enzyme'
import {
  InstalledAppList,
  InstalledAppListProps,
  onClickHandler,
  ListMobileScreen,
  ListDesktopScreen
} from '../installed-app-list'
import { appsDataStub } from '@/sagas/__stubs__/apps'
import { Loader } from '@reapit/elements'
import { AppSummaryModel } from '../../../types/marketplace-api-schema'

const app = (appsDataStub as { data: { data: AppSummaryModel[] } }).data.data[0]

const event = ({
  stopPropagation: jest.fn()
} as unknown) as React.MouseEvent

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

const listProps = {
  list: appsDataStub.data.data as AppSummaryModel[],
  loading: false,
  onCardClick: jest.fn(),
  infoType: 'CLIENT_APPS_EMPTY'
}

describe('InstalledAppList', () => {
  it('should match a snapshot', () => {
    expect(shallow(<InstalledAppList {...props} />)).toMatchSnapshot()
  })

  it('should match a snapshot when use empty infoType', () => {
    expect(shallow(<InstalledAppList infoType={''} {...props} />)).toMatchSnapshot()
  })

  it('should match a snappshot ListMobileScreen', () => {
    expect(shallow(<ListMobileScreen {...listProps} />)).toMatchSnapshot()
  })

  it('should match a snappshot ListDesktopScreen', () => {
    expect(shallow(<ListDesktopScreen {...listProps} />)).toMatchSnapshot()
  })

  it('should show loading', () => {
    const wrapper = shallow(<InstalledAppList {...props} loading />)
    expect(wrapper.find(Loader)).toHaveLength(1)
  })

  describe('onClickHandler', () => {
    it('should call onCardClick when it is defined', () => {
      const onCardClick = jest.fn()
      const fn = onClickHandler(onCardClick, app)
      fn(event)
      expect(onCardClick).toHaveBeenCalledWith(app)
    })
  })
})
