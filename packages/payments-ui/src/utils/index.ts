/* istanbul ignore file */
import { Dispatch, SetStateAction } from 'react'
import { ClientConfigModel } from '../types/config'
import { NavigateFunction } from 'react-router'

export const navigateRoute = (navigate: NavigateFunction, route: string) => (): void => {
  navigate(route)
}

export const checkShouldUpdateScript = (env: string) => {
  if (!window.sagepayOwnForm) return true
  if (window.SagePayConfig && !window.SagePayConfig.restHost?.includes(env)) return true
  return false
}

export const handleLoadOpayoScript =
  (config: ClientConfigModel | null, setConfigLoading: Dispatch<SetStateAction<boolean>>) => () => {
    const env = config?.isLive ? 'live' : 'sandbox'
    const shouldUpdateScript = checkShouldUpdateScript(env)
    if (config?.isConfigured && shouldUpdateScript) {
      const script = document.createElement('script')
      script.src = `https://${env}.opayo.eu.elavon.com/api/v1/js/sagepay.js`
      const head = document.querySelector('head')

      if (head) {
        head.appendChild(script)
        script.onload = () => {
          setConfigLoading(false)
        }
      }
    }
  }
