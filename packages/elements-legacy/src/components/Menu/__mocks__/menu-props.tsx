import React from 'react'
import { Location } from 'history'
import { MenuConfig } from '../Menu'
import {
  AccountIcon,
  AnalyticsIcon,
  ApiIcon,
  AppsIcon,
  DocsIcon,
  HelpIcon,
  MarketplaceIcon,
  ReapitHouseIcon,
  DesktopIcon,
  WebhooksIcon,
} from '../../Icons'

export const mockMenuProps: MenuConfig = {
  defaultActiveKey: 'APPS',
  mode: 'WEB',
  location: {
    pathname: '/',
  } as Location<any>,
  menu: [
    {
      key: 'LOGO',
      icon: <ReapitHouseIcon />,
      type: 'LOGO',
    },
    {
      title: 'Apps',
      key: 'APPS',
      url: '/apps',
      icon: <AppsIcon />,
      type: 'PRIMARY',
    },
    {
      title: 'Analytics',
      key: 'ANALYTICS',
      url: '/installed',
      icon: <AnalyticsIcon />,
      type: 'PRIMARY',
    },
    {
      title: 'API',
      key: 'API',
      url: '/api',
      icon: <ApiIcon />,
      type: 'PRIMARY',
    },
    {
      title: 'Webhooks',
      key: 'WEBHOOKS',
      url: '/webhooks',
      icon: <WebhooksIcon />,
      type: 'PRIMARY',
    },
    {
      title: 'Docs',
      key: 'DOCS',
      url: '/docs',
      icon: <DocsIcon />,
      type: 'PRIMARY',
    },
    {
      title: 'Desktop',
      key: 'DESKTOP',
      url: '/desktop',
      icon: <DesktopIcon />,
      type: 'PRIMARY',
    },
    {
      title: 'Help',
      key: 'HELP',
      url: '/help',
      icon: <HelpIcon />,
      type: 'PRIMARY',
    },
    {
      title: 'Marketplace',
      key: 'MARKETPLACE',
      url: '/marketplace',
      icon: <MarketplaceIcon />,
      type: 'PRIMARY',
    },
    {
      title: 'Settings',
      key: 'SETTINGS',
      url: '/settings',
      icon: <AccountIcon />,
      type: 'PRIMARY',
    },
  ],
}
