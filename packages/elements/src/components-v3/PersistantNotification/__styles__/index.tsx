import { css } from 'linaria'
import { styled } from 'linaria/react'
import { ElIcon } from '../../Icon/__styles__'
import { elIsActive } from '../../../styles-v3/base/states'
import {
  elIntentPrimary,
  elIntentSecondary,
  elIntentCritical,
  elIntentSuccess,
  elIntentDanger,
} from '../../../styles-v3/base/intent'

export const elPnIcon = css`
  padding: 0 0.5rem;
  display: flex;
  align-items: center;
  border-radius var(--default-border-radius) 0 0 var(--default-border-radius);
  cursor: pointer;

  ${ElIcon} {
    color: var(--color-white);
  }
`

export const elPnContent = css`
  padding: 0.75rem 1.25rem;
  opacity: 0;
  transition: 0.5s;
`

export const ElPersistantNotification = styled.div`
  display: flex;
  position: fixed;
  top: 1rem;
  right: 2rem; // should be the width of the elPnIcon element (icon is 1rem and padding is 0.5rem each side)
  max-width: 50%;
  transform: translateX(100%);
  transition: 0.5s;
  z-index: 10;

  &${elIsActive} {
    right: 0;
    transform: translateX(0);

    .${elPnContent} {
      opacity: 1;
    }
  }

  &${elIntentPrimary} {
    .${elPnContent} {
      background: var(--intent-primary-light);
      color: var(--intent-primary-light-text);
    }
    .${elPnIcon} {
      background: var(--intent-primary);
      color: var(--intent-primary-text);
    }
  }
  &${elIntentSecondary} {
    .${elPnContent} {
      background: var(--intent-secondary-light);
      color: var(--intent-secondary-light-text);
    }
    .${elPnIcon} {
      background: var(--intent-secondary);
      color: var(--intent-secondary-text);
    }
  }
  &${elIntentCritical} {
    .${elPnContent} {
      background: var(--intent-critical-light);
      color: var(--intent-critical-light-text);
    }
    .${elPnIcon} {
      background: var(--intent-critical);
      color: var(--intent-critical-text);
    }
  }
  &${elIntentSuccess} {
    .${elPnContent} {
      background: var(--intent-success-light);
      color: var(--intent-success-light-text);
    }
    .${elPnIcon} {
      background: var(--intent-success);
      color: var(--intent-success-text);
    }
  }
  &${elIntentDanger} {
    .${elPnContent} {
      background: var(--intent-danger-light);
      color: var(--intent-danger-light-text);
    }
    .${elPnIcon} {
      background: var(--intent-danger);
      color: var(--intent-danger-text);
    }
  }
`
