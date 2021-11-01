import { placeholderDocs } from './docs'
import { placeholderVideo } from './videos'
export const enum HelperWidgetApps {
  developerPortal = 'developerPortal',
}

export interface HelperWidgetConfigItem {
  url: string
  heading: string
  imageUrl?: string
  body?: string
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
