import { styled } from 'linaria/react'
import {
  elIntentPrimary,
  elIntentSecondary,
  elIntentCritical,
  elIntentSuccess,
  elIntentDanger,
} from '../../../styles-v3/base/intent'
import { ElIcon } from '../../Icon/__styles__'

export const ElSnack = styled.div`
  display: inline-flex;
  border-radius: var(--default-border-radius);
  padding: 0.75rem 1.25rem;
  align-items: center;

  ${ElIcon} {
    margin-right: 0.5rem;
  }

  &${elIntentPrimary} {
    background: var(--intent-primary-light);
    color: var(--intent-primary-light-text);

    ${ElIcon} {
      color: var(--intent-primary);
    }
  }

  &${elIntentSecondary} {
    background: var(--intent-secondary-light);
    color: var(--intent-secondary-light-text);

    ${ElIcon} {
      color: var(--intent-secondary);
    }
  }

  &${elIntentCritical} {
    background: var(--intent-critical-light);
    color: var(--intent-critical-light-text);

    ${ElIcon} {
      color: var(--intent-critical);
    }
  }

  &${elIntentSuccess} {
    background: var(--intent-success-light);
    color: var(--intent-success-light-text);

    ${ElIcon} {
      color: var(--intent-success);
    }
  }

  &${elIntentDanger} {
    background: var(--intent-danger-light);
    color: var(--intent-danger-light-text);

    ${ElIcon} {
      color: var(--intent-danger);
    }
  }
`
