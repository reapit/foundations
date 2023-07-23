import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { ElIcon } from '../../icon/__styles__'
import { elIsActive } from '../../../styles/states'
import {
  elIntentPrimary,
  elIntentSecondary,
  elIntentCritical,
  elIntentSuccess,
  elIntentDanger,
  elIntentWarning,
} from '../../../styles/intent'

export const elPnIsFullWidth = css``

export const elPnIsFixed = css``

export const elPnIsInline = css``

export const elPnIcon = css`
  padding: 0 1rem;
  display: flex;
  align-items: center;
  border-radius: var(--default-border-radius) 0 0 var(--default-border-radius);
  cursor: pointer;

  ${ElIcon} {
    color: var(--color-white);
  }
`

export const elPnContent = css`
  padding: 1rem;
  opacity: 0;
  transition: 0.5s;
  width: 100%;
`

export const ElPersistentNotification = styled.div`
  display: flex;
  position: absolute;
  max-width: 50%;
  right: 0;
  transform: translateX(calc(100% - 3rem));
  transition: 0.5s;
  z-index: 10;
  font-size: var(--font-size-default);

  &.${elIsActive} {
    right: 0;
    transform: translateX(calc(0%));

    .${elPnContent} {
      opacity: 1;
    }
  }

  &.${elPnIsFullWidth} {
    width: 100%;
    max-width: 100%;
    flex: 1 0 auto;
  }

  &.${elPnIsFixed} {
    position: fixed;
    top: 1rem;
    right: 2rem; // should be the width of the elPnIcon element (icon is 1rem and padding is 0.5rem each side)
  }

  &.${elPnIsInline} {
    position: relative;
    background: var(--color-white);
    .${elPnContent} {
      border-radius: 0 var(--default-border-radius) var(--default-border-radius) 0;
    }
  }

  &.${elIntentPrimary}, &.${elIntentSecondary} {
    .${elPnContent} {
      background: var(--intent-primary-lightest);
    }

    .${elPnIcon} {
      background: var(--intent-primary-lightest);

      svg {
        color: var(--intent-primary);
      }
    }
  }

  &.${elIntentCritical}, &.${elIntentWarning} {
    .${elPnContent} {
      background: var(--intent-warning-lightest);
    }

    .${elPnIcon} {
      background: var(--intent-warning-lightest);

      svg {
        color: var(--intent-warning);
      }
    }
  }

  &.${elIntentSuccess} {
    .${elPnContent} {
      background: var(--intent-success-lightest);
    }

    .${elPnIcon} {
      background: var(--intent-success-lightest);

      svg {
        color: var(--intent-success);
      }
    }
  }

  &.${elIntentDanger} {
    .${elPnContent} {
      background: var(--intent-danger-lightest);
    }

    .${elPnIcon} {
      background: var(--intent-danger-lightest);

      svg {
        color: var(--intent-danger);
      }
    }
  }
`
