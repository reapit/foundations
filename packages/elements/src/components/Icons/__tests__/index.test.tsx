import React from 'react'
import { shallow } from 'enzyme'
import {
  AccountIcon,
  AnalyticsIcon,
  ApiIcon,
  AppsIcon,
  DataIcon,
  DesktopIcon,
  DevelopersIcon,
  DocsIcon,
  FinishIcon,
  HelpIcon,
  InstalledIcon,
  LoginIcon,
  ManageIcon,
  MarketplaceIcon,
  NoIcon,
  OfficesIcon,
  PaymentsIcon,
  ProfileIcon,
  ReapitHouseIcon,
  ResultsIcon,
  SearchIcon,
  SnackbarErrorIcon,
  SnackbarInfoIcon,
  SnackbarSuccessIcon,
  SnackbarWarningIcon,
  UsersIcon,
  WebhooksIcon,
  WelcomeIcon,
} from '../index'

describe('Icons', () => {
  it('should match a snapshot for AnalyticsIcon', () => {
    const mounted = shallow(<AnalyticsIcon />)
    expect(mounted).toMatchSnapshot()
  })

  it('should match a snapshot for ApiIcon', () => {
    const mounted = shallow(<ApiIcon />)
    expect(mounted).toMatchSnapshot()
  })

  it('should match a snapshot for AppsIcon', () => {
    const mounted = shallow(<AppsIcon />)
    expect(mounted).toMatchSnapshot()
  })

  it('should match a snapshot for DesktopIcon', () => {
    const mounted = shallow(<DesktopIcon />)
    expect(mounted).toMatchSnapshot()
  })

  it('should match a snapshot for DocsIcon', () => {
    const mounted = shallow(<DocsIcon />)
    expect(mounted).toMatchSnapshot()
  })

  it('should match a snapshot for HelpIcon', () => {
    const mounted = shallow(<HelpIcon />)
    expect(mounted).toMatchSnapshot()
  })

  it('should match a snapshot for MarketplaceIcon', () => {
    const mounted = shallow(<MarketplaceIcon />)
    expect(mounted).toMatchSnapshot()
  })

  it('should match a snapshot for AccountIcon', () => {
    const mounted = shallow(<AccountIcon />)
    expect(mounted).toMatchSnapshot()
  })

  it('should match a snapshot for WebhooksIcon', () => {
    const mounted = shallow(<WebhooksIcon />)
    expect(mounted).toMatchSnapshot()
  })

  it('should match a snapshot for NoIcon', () => {
    const mounted = shallow(<NoIcon />)
    expect(mounted).toMatchSnapshot()
  })

  it('should match a snapshot for ProfileIcon', () => {
    const mounted = shallow(<ProfileIcon />)
    expect(mounted).toMatchSnapshot()
  })

  it('should match a snapshot for PaymentsIcon', () => {
    const mounted = shallow(<PaymentsIcon />)
    expect(mounted).toMatchSnapshot()
  })

  it('should match a snapshot for SearchIcon', () => {
    const mounted = shallow(<SearchIcon />)
    expect(mounted).toMatchSnapshot()
  })

  it('should match a snapshot for ManageIcon', () => {
    const mounted = shallow(<ManageIcon />)
    expect(mounted).toMatchSnapshot()
  })

  it('should match a snapshot for UsersIcon', () => {
    const mounted = shallow(<UsersIcon />)
    expect(mounted).toMatchSnapshot()
  })

  it('should match a snapshot for DataIcon', () => {
    const mounted = shallow(<DataIcon />)
    expect(mounted).toMatchSnapshot()
  })

  it('should match a snapshot for InstalledIcon', () => {
    const mounted = shallow(<InstalledIcon />)
    expect(mounted).toMatchSnapshot()
  })

  it('should match a snapshot for DevelopersIcon', () => {
    const mounted = shallow(<DevelopersIcon />)
    expect(mounted).toMatchSnapshot()
  })

  it('should match a snapshot for OfficesIcon', () => {
    const mounted = shallow(<OfficesIcon />)
    expect(mounted).toMatchSnapshot()
  })

  it('should match a snapshot for ResultsIcon', () => {
    const mounted = shallow(<ResultsIcon />)
    expect(mounted).toMatchSnapshot()
  })

  it('should match a snapshot for ReapitHouseIcon', () => {
    const mounted = shallow(<ReapitHouseIcon />)
    expect(mounted).toMatchSnapshot()
  })

  it('should match a snapshot for FinishIcon', () => {
    const mounted = shallow(<FinishIcon />)
    expect(mounted).toMatchSnapshot()
  })

  it('should match a snapshot for LoginIcon', () => {
    const mounted = shallow(<LoginIcon />)
    expect(mounted).toMatchSnapshot()
  })

  it('should match a snapshot for WelcomeIcon', () => {
    const mounted = shallow(<WelcomeIcon />)
    expect(mounted).toMatchSnapshot()
  })

  it('should match a snapshot for SnackbarWarningIcon', () => {
    const mounted = shallow(<SnackbarWarningIcon />)
    expect(mounted).toMatchSnapshot()
  })

  it('should match a snapshot for SnackbarSuccessIcon', () => {
    const mounted = shallow(<SnackbarSuccessIcon />)
    expect(mounted).toMatchSnapshot()
  })

  it('should match a snapshot for SnackbarInfoIcon', () => {
    const mounted = shallow(<SnackbarInfoIcon />)
    expect(mounted).toMatchSnapshot()
  })

  it('should match a snapshot for SnackbarErrorIcon', () => {
    const mounted = shallow(<SnackbarErrorIcon />)
    expect(mounted).toMatchSnapshot()
  })
})
