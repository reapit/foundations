import React from 'react'
import { render } from '../../../tests/react-testing'
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
    const mounted = render(<AnalyticsIcon />)
    expect(mounted).toMatchSnapshot()
  })

  it('should match a snapshot for ApiIcon', () => {
    const mounted = render(<ApiIcon />)
    expect(mounted).toMatchSnapshot()
  })

  it('should match a snapshot for AppsIcon', () => {
    const mounted = render(<AppsIcon />)
    expect(mounted).toMatchSnapshot()
  })

  it('should match a snapshot for DesktopIcon', () => {
    const mounted = render(<DesktopIcon />)
    expect(mounted).toMatchSnapshot()
  })

  it('should match a snapshot for DocsIcon', () => {
    const mounted = render(<DocsIcon />)
    expect(mounted).toMatchSnapshot()
  })

  it('should match a snapshot for HelpIcon', () => {
    const mounted = render(<HelpIcon />)
    expect(mounted).toMatchSnapshot()
  })

  it('should match a snapshot for MarketplaceIcon', () => {
    const mounted = render(<MarketplaceIcon />)
    expect(mounted).toMatchSnapshot()
  })

  it('should match a snapshot for AccountIcon', () => {
    const mounted = render(<AccountIcon />)
    expect(mounted).toMatchSnapshot()
  })

  it('should match a snapshot for WebhooksIcon', () => {
    const mounted = render(<WebhooksIcon />)
    expect(mounted).toMatchSnapshot()
  })

  it('should match a snapshot for NoIcon', () => {
    const mounted = render(<NoIcon />)
    expect(mounted).toMatchSnapshot()
  })

  it('should match a snapshot for ProfileIcon', () => {
    const mounted = render(<ProfileIcon />)
    expect(mounted).toMatchSnapshot()
  })

  it('should match a snapshot for PaymentsIcon', () => {
    const mounted = render(<PaymentsIcon />)
    expect(mounted).toMatchSnapshot()
  })

  it('should match a snapshot for SearchIcon', () => {
    const mounted = render(<SearchIcon />)
    expect(mounted).toMatchSnapshot()
  })

  it('should match a snapshot for ManageIcon', () => {
    const mounted = render(<ManageIcon />)
    expect(mounted).toMatchSnapshot()
  })

  it('should match a snapshot for UsersIcon', () => {
    const mounted = render(<UsersIcon />)
    expect(mounted).toMatchSnapshot()
  })

  it('should match a snapshot for DataIcon', () => {
    const mounted = render(<DataIcon />)
    expect(mounted).toMatchSnapshot()
  })

  it('should match a snapshot for InstalledIcon', () => {
    const mounted = render(<InstalledIcon />)
    expect(mounted).toMatchSnapshot()
  })

  it('should match a snapshot for DevelopersIcon', () => {
    const mounted = render(<DevelopersIcon />)
    expect(mounted).toMatchSnapshot()
  })

  it('should match a snapshot for OfficesIcon', () => {
    const mounted = render(<OfficesIcon />)
    expect(mounted).toMatchSnapshot()
  })

  it('should match a snapshot for ResultsIcon', () => {
    const mounted = render(<ResultsIcon />)
    expect(mounted).toMatchSnapshot()
  })

  it('should match a snapshot for ReapitHouseIcon', () => {
    const mounted = render(<ReapitHouseIcon />)
    expect(mounted).toMatchSnapshot()
  })

  it('should match a snapshot for FinishIcon', () => {
    const mounted = render(<FinishIcon />)
    expect(mounted).toMatchSnapshot()
  })

  it('should match a snapshot for LoginIcon', () => {
    const mounted = render(<LoginIcon />)
    expect(mounted).toMatchSnapshot()
  })

  it('should match a snapshot for WelcomeIcon', () => {
    const mounted = render(<WelcomeIcon />)
    expect(mounted).toMatchSnapshot()
  })

  it('should match a snapshot for SnackbarWarningIcon', () => {
    const mounted = render(<SnackbarWarningIcon />)
    expect(mounted).toMatchSnapshot()
  })

  it('should match a snapshot for SnackbarSuccessIcon', () => {
    const mounted = render(<SnackbarSuccessIcon />)
    expect(mounted).toMatchSnapshot()
  })

  it('should match a snapshot for SnackbarInfoIcon', () => {
    const mounted = render(<SnackbarInfoIcon />)
    expect(mounted).toMatchSnapshot()
  })

  it('should match a snapshot for SnackbarErrorIcon', () => {
    const mounted = render(<SnackbarErrorIcon />)
    expect(mounted).toMatchSnapshot()
  })
})
