import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { ElIcon } from '../../icon/__styles__'
import { elIsActive } from '../../../styles/states'
import {
  elIntentPrimary,
  elIntentNeutral,
  elIntentSuccess,
  elIntentPending,
  elIntentWarning,
  elIntentDanger,
  elIntentDefault,
} from '../../../styles/intent'

export const elPnIsFullWidth = css``

export const elPnIsFixed = css``

export const elPnIsInline = css``

export const elPnIcon = css`
  padding-left: 0.75rem;
  display: flex;
  align-items: center;
  border-radius: var(--default-border-radius) 0 0 var(--default-border-radius);
  cursor: pointer;

  ${ElIcon} {
    color: var(--color-white);
  }
`

export const elPnContent = css`
  padding: 0.75rem;
  transition: 0.5s;
  width: 100%;
  color: var(--color-black);
  font-size: var(--font-size-default);
`

export const ElPersistentNotification = styled.div`
  display: flex;
  position: absolute;
  max-width: 50%;
  right: 0;
  transform: translateX(calc(100% - 2.25rem));
  transition: 0.5s;
  z-index: 10;
  font-size: var(--font-size-default);

  &.${elIsActive} {
    right: 0;
    transform: translateX(calc(0%));
  }

  &.${elPnIsFullWidth} {
    width: 100%;
    max-width: 100%;
    flex: 1 0 auto;
  }

  &.${elPnIsFixed} {
    position: fixed;
    top: 1rem;
  }

  &.${elPnIsInline} {
    position: relative;
    background: var(--color-white);
    .${elPnContent} {
      border-radius: 0 var(--default-border-radius) var(--default-border-radius) 0;
    }
  }

  &.${elIntentPrimary} {
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

  &.${elIntentNeutral} {
    .${elPnContent} {
      background: var(--intent-neutral-lightest);
    }

    .${elPnIcon} {
      background: var(--intent-neutral-lightest);

      svg {
        color: var(--intent-neutral);
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

  &.${elIntentPending} {
    .${elPnContent} {
      background: var(--intent-pending-lightest);
    }

    .${elPnIcon} {
      background: var(--intent-pending-lightest);

      svg {
        color: var(--intent-pending);
      }
    }
  }

  &.${elIntentWarning} {
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

  &.${elIntentDefault} {
    .${elPnContent} {
      background: var(--intent-default-lightest);
    }

    .${elPnIcon} {
      background: var(--intent-default-lightest);

      svg {
        color: var(--intent-default);
      }
    }
  }
`
