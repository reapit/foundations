import { styled } from 'linaria/react'
import {
  elIntentPrimary,
  elIntentSecondary,
  elIntentCritical,
  elIntentSuccess,
  elIntentDanger,
} from '../../../styles-v3/base/intent'

export const ElIcon = styled.span`
  display: flex;
  color: black;

  &${elIntentPrimary} {
    color: var(--intent-primary);
  }
  &${elIntentSecondary} {
    color: var(--intent-secondary);
  }
  &${elIntentCritical} {
    color: var(--intent-critical);
  }
  &${elIntentSuccess} {
    color: var(--intent-success);
  }
  &${elIntentDanger} {
    color: var(--intent-danger);
  }
`
