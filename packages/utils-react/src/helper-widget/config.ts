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
  pathnames: string[]
  videos: HelperWidgetConfigItem[]
  docs: HelperWidgetConfigItem[]
}

export type HelperWidgetConfigMap = { [key in HelperWidgetApps]: HelperWidgetConfig[] }

export const helperWidgetConfig: HelperWidgetConfigMap = {
  developerPortal: [
    {
      pathnames: ['/webhooks/about'],
      videos: [placeholderVideo],
      docs: [placeholderDocs],
    },
    {
      pathnames: ['/webhooks/about', '/webhooks/new'],
      videos: [placeholderVideo],
      docs: [placeholderDocs],
    },
  ],
}
