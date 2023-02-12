/* istanbul ignore file */
import { History } from 'history'
import { Dispatch, SetStateAction } from 'react'
import { ClientConfigModel } from '../types/config'

export const navigate = (history: History, route: string) => (): void => {
  history.push(route)
}

export const checkShouldUpdateScript = (env: string) => {
  if (!window.sagepayOwnForm) return true
  if (window.SagePayConfig && !window.SagePayConfig.restHost?.includes(env)) return true
  return false
}

export const handleLoadOpayoScript =
  (config: ClientConfigModel | null, setConfigLoading: Dispatch<SetStateAction<boolean>>) => () => {
    const env = config?.isLive ? 'live' : 'test'
    const shouldUpdateScript = checkShouldUpdateScript(env)
    if (config?.isConfigured && shouldUpdateScript) {
      const script = document.createElement('script')
      script.src = `https://pi-${env}.sagepay.com/api/v1/js/sagepay.js`
      const head = document.querySelector('head')

      if (head) {
        head.appendChild(script)
        script.onload = () => {
          setConfigLoading(false)
        }
      }
    }
  }
