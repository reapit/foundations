import * as React from 'react'
import { render } from '@testing-library/react'
import { Tabs, TabConfig } from '../index'

const tabConfigs = ({ tab, handleChangeTab }: any): TabConfig[] => [
  {
    tabIdentifier: 'ITEMONE',
    displayText: 'Item one',
    onTabClick: handleChangeTab,
    active: tab === 'ITEMONE',
  },
  {
    tabIdentifier: 'ITEMTWO',
    displayText: 'Item two',
    onTabClick: handleChangeTab,
    active: tab === 'ITEMTWO',
  },
]

const props: Partial<any> = {
  tab: 'ITEMONE',
  handleChangeTab: jest.fn(),
}

describe('Tabs', () => {
  it('should match a snapshot', () => {
    expect(render(<Tabs tabConfigs={tabConfigs(props)} />)).toMatchSnapshot()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
