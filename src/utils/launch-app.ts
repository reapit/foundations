import { AppSummaryModel } from '@/types/marketplace-api-schema'
import { oc } from 'ts-optchain'

export const handleLaunchApp = (app: AppSummaryModel) => {
  import('../core/store').then(store => {
    if (app.homePage && app.id) {
      if (oc(store).default.state.auth.refreshSession.mode()) {
        window.location.href = `desktop://app?id=${app.id}&launchUri=${app.homePage}`
      } else {
        window.location.href = app.homePage
      }
    }
  })
}
