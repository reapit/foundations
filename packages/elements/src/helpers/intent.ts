import {
  elIntentPrimary,
  elIntentSuccess,
  elIntentDanger,
  elIntentNeutral,
  elIntentPending,
  elIntentWarning,
} from '../styles/intent'

export type Intent =
  | 'primary'
  | 'pending'
  | 'success'
  | 'warning'
  | 'danger'
  | 'neutral'
  | 'secondary'
  | 'critical'
  | 'low'

export const getIntentClassName = (intent: Intent): string => {
  switch (intent) {
    case 'primary':
      return elIntentPrimary
    case 'pending':
      return elIntentPending
    case 'success':
      return elIntentSuccess
    case 'warning':
      return elIntentWarning
    case 'danger':
      return elIntentDanger
    case 'critical':
    case 'low':
    case 'secondary':
      console.warn(
        `${intent} intent is deprecated and will be removed at v5. Currently this value defaults to neutral intent. Please find a more appropriate intent from the docs if desired`,
      )
    case 'neutral':
    default:
      return elIntentNeutral
  }
}
