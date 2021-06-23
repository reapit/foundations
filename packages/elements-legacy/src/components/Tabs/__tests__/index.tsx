import * as React from 'react'
import { shallow } from 'enzyme'
import { Tabs, TabConfig } from '../index'
import toJson from 'enzyme-to-json'

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
    expect(toJson(shallow(<Tabs tabConfigs={tabConfigs(props)} />))).toMatchSnapshot()
  })

  it('simulates afterClose event', () => {
    const wrapper = shallow(<Tabs tabConfigs={tabConfigs(props)} />)
    wrapper.find('a').first().simulate('click', {
      preventDefault: jest.fn(),
    })
    expect(props.handleChangeTab).toBeCalledTimes(1)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
