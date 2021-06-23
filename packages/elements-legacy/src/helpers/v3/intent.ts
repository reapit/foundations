import {
  elIntentPrimary,
  elIntentSecondary,
  elIntentCritical,
  elIntentSuccess,
  elIntentDanger,
} from '../../styles-v3/base/intent'

export type Intent = 'primary' | 'secondary' | 'critical' | 'success' | 'danger'

export const getIntentClassName = (intent: Intent): string => {
  switch (intent) {
    case 'primary':
      return elIntentPrimary
    case 'secondary':
      return elIntentSecondary
    case 'critical':
      return elIntentCritical
    case 'success':
      return elIntentSuccess
    case 'danger':
      return elIntentDanger
  }
}
