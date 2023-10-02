import {
  elIntentPrimary,
  elIntentSuccess,
  elIntentDanger,
  elIntentNeutral,
  elIntentPending,
  elIntentWarning,
  elIntentDefault,
} from '../styles/intent'

export type Intent =
  | 'primary'
  | 'neutral'
  | 'success'
  | 'pending'
  | 'warning'
  | 'danger'
  | 'default'
  | 'secondary'
  | 'critical'
  | 'low'

export const getIntentClassName = (intent: Intent): string => {
  switch (intent) {
    case 'primary':
      return elIntentPrimary
    case 'neutral':
      return elIntentNeutral
    case 'success':
      return elIntentSuccess
    case 'pending':
      return elIntentPending
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
      return elIntentDefault
    default:
      return elIntentDefault
  }
}
