import {
  elIntentPrimary,
  elIntentSecondary,
  elIntentCritical,
  elIntentSuccess,
  elIntentDanger,
  elIntentNeutral,
  elIntentLow,
} from '../styles/intent'

export type Intent = 'primary' | 'secondary' | 'critical' | 'success' | 'danger' | 'neutral' | 'low'

export const getIntentClassName = (intent: Intent): string => {
  switch (intent) {
    case 'primary':
      return elIntentPrimary ?? ''
    case 'secondary':
      return elIntentSecondary ?? ''
    case 'critical':
      return elIntentCritical ?? ''
    case 'success':
      return elIntentSuccess ?? ''
    case 'danger':
      return elIntentDanger ?? ''
    case 'low':
      return elIntentLow ?? ''
    case 'neutral':
    default:
      return elIntentNeutral ?? ''
  }
}
