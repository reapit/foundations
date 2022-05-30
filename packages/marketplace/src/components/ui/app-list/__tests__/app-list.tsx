import * as React from 'react'
import { render } from '../../../tests/react-testing'

import { AppList, AppListProps } from '../app-list'
import { appsDataStub } from '@/sagas/__stubs__/apps'
import { GridFourColItem, Helper } from '@reapit/elements-legacy'
import { Loader } from '@reapit/elements'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import AppCard from '../../app-card'

const props: AppListProps = {
  list: appsDataStub.data as AppSummaryModel[],
  loading: false,
  onCardClick: jest.fn(),
  onSettingsClick: jest.fn(),
  infoType: 'CLIENT_APPS_EMPTY',
}

describe('AppList', () => {
  it('should match a snapshot', () => {
    expect(render(<AppList {...props} />)).toMatchSnapshot()
  })

  it('should match a snapshot when use empty infoType', () => {
    expect(render(<AppList {...props} infoType={''} />)).toMatchSnapshot()
  })

  it('should show loading', () => {
    const wrapper = render(<AppList {...props} loading />)
    expect(wrapper.find(Loader)).toHaveLength(1)
  })

  it('should respond to a card click event', () => {
    const wrapper = render(<AppList {...props} />)
    wrapper.find(AppCard).first().simulate('click', { stopPropagation: jest.fn() })
    expect(props.onCardClick).toHaveBeenCalledTimes(1)
    expect(props.onCardClick).toHaveBeenCalledWith(appsDataStub?.data?.[0])
  })

  it('should contain GridFourColItem', () => {
    const wrapper = render(<AppList {...props} />)
    expect(wrapper.find(GridFourColItem).length).toBeGreaterThan(0)
  })

  it('should match the empty search message', () => {
    const emptyListProps: AppListProps = { ...props, list: [], infoType: '' }
    const wrapper = render(<AppList {...emptyListProps} />)
    const EMPTY_SEARCH_MESSAGE = 'We are unable to find any Apps that match your search criteria. Please try again.'

    const alert = wrapper.find(Helper).dive()

    expect(alert.text()).toBe(EMPTY_SEARCH_MESSAGE)
  })
})
