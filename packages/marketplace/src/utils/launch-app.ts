import { AppSummaryModel } from '@reapit/foundations-ts-definitions'

/**
 * retest on desktop
 */
export const handleLaunchApp = (app: AppSummaryModel, connectIsDesktop: Boolean) => {
  console.log({ app })

  if (!app.launchUri || !app.id) {
    return
  }

  if (connectIsDesktop) {
    window.location.href = `agencycloud://app?id=${app.id}&launchUri=${app.homePage}`
    return
  }

  window.location.href = app.launchUri
}
