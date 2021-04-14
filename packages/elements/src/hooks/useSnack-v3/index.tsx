import { useContext } from 'react'
import { SnackContext } from '../../contexts/snacks'
import { ISnack } from '../../components-v3/Snack'

interface IUseSnack {
  custom: (snack: ISnack, timeout?: number) => void
  success: (text: string, timeout?: number) => void
  info: (text: string, timeout?: number) => void
  error: (text: string, timeout?: number) => void
  warning: (text: string, timeout?: number) => void
}

export default (): IUseSnack => {
  const { addSnackWithTimeout } = useContext(SnackContext)
  const DEFAULT_TIMEOUT = 3000

  const custom = (snack: ISnack, timeout = DEFAULT_TIMEOUT) => {
    addSnackWithTimeout(snack, timeout)
  }
  const success = (text: string, timeout = DEFAULT_TIMEOUT) => {
    addSnackWithTimeout({ intent: 'success', icon: 'thick', text }, timeout)
  }
  const info = (text: string, timeout = DEFAULT_TIMEOUT) => {
    addSnackWithTimeout({ intent: 'secondary', icon: 'info', text }, timeout)
  }
  const error = (text: string, timeout = DEFAULT_TIMEOUT) => {
    addSnackWithTimeout({ intent: 'danger', icon: 'error', text }, timeout)
  }
  const warning = (text: string, timeout = DEFAULT_TIMEOUT) => {
    addSnackWithTimeout({ intent: 'critical', icon: 'warning', text }, timeout)
  }

  return { custom, success, info, error, warning }
}
