import * as React from 'react'
import { render } from '../../../../tests/react-testing'
import {
  InstalledAppList,
  InstalledAppListProps,
  onClickHandler,
  ListMobileScreen,
  ListDesktopScreen,
} from '../installed-app-list'
import { appsDataStub } from '@/sagas/__stubs__/apps'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'

const app = appsDataStub.data?.[0] as AppSummaryModel

const event = {
  stopPropagation: jest.fn(),
} as unknown as React.MouseEvent

const props: InstalledAppListProps = {
  list: appsDataStub.data as AppSummaryModel[],
  loading: false,
  onCardClick: jest.fn(),
  infoType: 'CLIENT_APPS_EMPTY',
  pagination: {
    pageNumber: 2,
    pageSize: 20,
    totalCount: 200,
    onChange: jest.fn(),
  },
}

const listProps = {
  list: appsDataStub.data as AppSummaryModel[],
  loading: false,
  onCardClick: jest.fn(),
  infoType: 'CLIENT_APPS_EMPTY',
}

describe('InstalledAppList', () => {
  it('should match a snapshot', () => {
    expect(render(<InstalledAppList {...props} />)).toMatchSnapshot()
  })

  it('should match a snapshot when use empty infoType', () => {
    expect(render(<InstalledAppList {...props} />)).toMatchSnapshot()
  })

  it('should match a snappshot ListMobileScreen', () => {
    expect(render(<ListMobileScreen {...listProps} />)).toMatchSnapshot()
  })

  it('should match a snappshot ListDesktopScreen', () => {
    expect(render(<ListDesktopScreen {...listProps} />)).toMatchSnapshot()
  })

  it('should show loading', () => {
    expect(render(<ListDesktopScreen {...listProps} loading />)).toMatchSnapshot()
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
