import { useContext } from 'react'
import { SnackContext } from '../../contexts/snacks'
import { SnackProps } from '../../components/snack'

interface IUseSnack {
  custom: (snack: SnackProps, timeout?: number) => void
  success: (text: string, timeout?: number) => void
  info: (text: string, timeout?: number) => void
  error: (text: string, timeout?: number) => void
  warning: (text: string, timeout?: number) => void
}

export default (): IUseSnack => {
  const { addSnackWithTimeout } = useContext(SnackContext)
  const DEFAULT_TIMEOUT = 3000

  const custom = (snack: SnackProps, timeout = DEFAULT_TIMEOUT) => {
    addSnackWithTimeout(snack, timeout)
  }
  const success = (text: string, timeout = DEFAULT_TIMEOUT) => {
    addSnackWithTimeout({ intent: 'success', icon: 'tickSolidSystem', text }, timeout)
  }
  const info = (text: string, timeout = DEFAULT_TIMEOUT) => {
    addSnackWithTimeout({ intent: 'secondary', icon: 'infoSolidSystem', text }, timeout)
  }
  const error = (text: string, timeout = DEFAULT_TIMEOUT) => {
    addSnackWithTimeout({ intent: 'danger', icon: 'errorSolidSystem', text }, timeout)
  }
  const warning = (text: string, timeout = DEFAULT_TIMEOUT) => {
    addSnackWithTimeout({ intent: 'critical', icon: 'warningSolidSystem', text }, timeout)
  }

  return { custom, success, info, error, warning }
}
