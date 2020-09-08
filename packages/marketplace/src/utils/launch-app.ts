import { AppSummaryModel } from '@reapit/foundations-ts-definitions'

export const handleLaunchApp = (app: AppSummaryModel, connectIsDesktop: Boolean) => {
  if (!app.launchUri || !app.id) {
    return
  }

  if (connectIsDesktop) {
    window.location.href = `agencycloud://app?id=${app.id}&launchUri=${app.launchUri}`
    return
  }

  window.location.href = app.launchUri
}
