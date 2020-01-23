import { AppSummaryModel } from '@reapit/foundations-ts-definitions'

export const handleLaunchApp = (app: AppSummaryModel) => {
  import('../core/store').then(store => {
    if (app.homePage && app.id) {
      if (store?.default?.state?.auth?.refreshSession?.mode === 'DESKTOP') {
        window.location.href = `desktop://app?id=${app.id}&launchUri=${app.homePage}`
      } else {
        window.location.href = app.homePage
      }
    }
  })
}
