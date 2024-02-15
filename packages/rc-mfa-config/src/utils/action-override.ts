import Cookie from 'js-cookie'
import { getRCConfig } from '../core/connect-session'

export const useRCAPI = Cookie.get('mfa_native_token_required') === 'true'
const rcAPIBaseUrl = getRCConfig().connectOAuthUrl + '/rpt'

export const actionOverride = <T extends { api: string }>(action: T) => {
  if (!useRCAPI) {
    return action
  }
  return {
    ...action,
    api: rcAPIBaseUrl,
  }
}
