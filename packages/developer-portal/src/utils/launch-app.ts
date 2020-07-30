import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { reapitConnectBrowserSession } from '@/core/connect-session'

export const handleLaunchApp = (app: AppSummaryModel) => {
  import('../core/store').then(() => {
    if (app.launchUri && app.id) {
      if (reapitConnectBrowserSession.connectIsDesktop) {
        window.location.href = `agencycloud://app?id=${app.id}&launchUri=${app.homePage}`
      } else {
        window.location.href = app.launchUri
      }
    }
  })
}
