import { ReactNode } from 'react'
import { placeholderDocs } from './docs'
import { placeholderVideo } from './videos'

export enum HelperWidgetApps {
  developerPortal = 'developerPortal',
}

export interface HelperWidgetConfigItem {
  url: string
  heading: string
  image?: ReactNode
  body?: ReactNode
}

export interface HelperWidgetConfig {
  title: string
  pathname: string
  videos: HelperWidgetConfigItem[]
  docs: HelperWidgetConfigItem[]
}

export type HelperWidgetConfigMap = { [key in HelperWidgetApps]: HelperWidgetConfig[] }

export const helperWidgetConfig: HelperWidgetConfigMap = {
  developerPortal: [
    {
      title: 'Webhooks',
      pathname: '/webhooks/about',
      videos: [placeholderVideo],
      docs: [placeholderDocs],
    },
    {
      title: 'Webhooks',
      pathname: '/webhooks/new',
      videos: [placeholderVideo, placeholderVideo],
      docs: [placeholderDocs, placeholderDocs],
    },
  ],
}
