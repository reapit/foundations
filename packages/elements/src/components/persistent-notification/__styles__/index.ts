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
} from '../../../styles/intent'

export const elPersistentNotificationIsFullWidth = css``

export const elPersistentNotificationIsFixed = css``

export const elPersistentNotificationIsInline = css``

export const elPersistentNotificationIcon = css`
  padding: 0 0.5rem;
  display: flex;
  align-items: center;
  border-radius: var(--default-border-radius) 0 0 var(--default-border-radius);
  cursor: pointer;

  ${ElIcon} {
    color: var(--color-white);
  }
`

export const elPersistentNotificationContent = css`
  padding: 0.75rem 1.25rem;
  opacity: 0;
  transition: 0.5s;
  width: 100%;
`

export const ElPersistentNotification = styled.div`
  display: flex;
  position: absolute;
  max-width: 50%;
  right: 0;
  transform: translateX(calc(100% - 2rem));
  transition: 0.5s;
  z-index: 10;

  &.${elIsActive} {
    right: 0;
    transform: translateX(calc(0%));

    .${elPersistentNotificationContent} {
      opacity: 1;
    }
  }

  &.${elPersistentNotificationIsFullWidth} {
    width: 100%;
    max-width: 100%;
    flex: 1 0 auto;
  }

  &.${elPersistentNotificationIsFixed} {
    position: fixed;
    top: 1rem;
    right: 2rem; // should be the width of the elPersistentNotificationIcon element (icon is 1rem and padding is 0.5rem each side)
  }

  &.${elPersistentNotificationIsInline} {
    position: relative;
    background: var(--color-white);
    .${elPersistentNotificationContent} {
      border-radius: 0 var(--default-border-radius) var(--default-border-radius) 0;
    }
  }

  &.${elIntentPrimary} {
    .${elPersistentNotificationContent} {
      background: var(--intent-primary-light);
      color: var(--intent-primary-light-text);
    }

    .${elPersistentNotificationIcon} {
      background: var(--intent-primary);
      color: var(--intent-primary-text);
    }

    &.${elPersistentNotificationIsInline} {
      .${elPersistentNotificationContent} {
        background: var(--color-white);
        border: 2px var(--intent-primary-light) solid;
      }

      .${elPersistentNotificationIcon} {
        background: var(--intent-primary-light);
        border: 2px var(--intent-primary-light) solid;

        svg {
          color: var(--intent-primary);
        }
      }
    }
  }

  &.${elIntentSecondary} {
    .${elPersistentNotificationContent} {
      background: var(--intent-secondary-light);
      color: var(--intent-secondary-light-text);
    }
    .${elPersistentNotificationIcon} {
      background: var(--intent-secondary);
      color: var(--intent-secondary-text);
    }

    &.${elPersistentNotificationIsInline} {
      .${elPersistentNotificationContent} {
        background: var(--color-white);
        border: 2px var(--intent-secondary-light) solid;
      }

      .${elPersistentNotificationIcon} {
        background: var(--intent-secondary-light);
        border: 2px var(--intent-secondary-light) solid;

        svg {
          color: var(--intent-secondary);
        }
      }
    }
  }

  &.${elIntentCritical} {
    .${elPersistentNotificationContent} {
      background: var(--intent-critical-light);
      color: var(--intent-critical-light-text);
    }

    .${elPersistentNotificationIcon} {
      background: var(--intent-critical);
      color: var(--intent-critical-text);
    }

    &.${elPersistentNotificationIsInline} {
      .${elPersistentNotificationContent} {
        background: var(--color-white);
        border: 2px var(--intent-critical-light) solid;
      }

      .${elPersistentNotificationIcon} {
        background: var(--intent-critical-light);
        border: 2px var(--intent-critical-light) solid;

        svg {
          color: var(--intent-critical);
        }
      }
    }
  }

  &.${elIntentSuccess} {
    .${elPersistentNotificationContent} {
      background: var(--intent-success-light);
      color: var(--intent-success-light-text);
    }

    .${elPersistentNotificationIcon} {
      background: var(--intent-success);
      color: var(--intent-success-text);
    }

    &.${elPersistentNotificationIsInline} {
      .${elPersistentNotificationContent} {
        background: var(--color-white);
        border: 2px var(--intent-success-light) solid;
      }

      .${elPersistentNotificationIcon} {
        background: var(--intent-success-light);
        border: 2px var(--intent-success-light) solid;

        svg {
          color: var(--intent-success);
        }
      }
    }
  }

  &.${elIntentDanger} {
    .${elPersistentNotificationContent} {
      background: var(--intent-danger-light);
      color: var(--intent-danger-light-text);
    }

    .${elPersistentNotificationIcon} {
      background: var(--intent-danger);
      color: var(--intent-danger-text);
    }

    &.${elPersistentNotificationIsInline} {
      .${elPersistentNotificationContent} {
        background: var(--color-white);
        border: 2px var(--intent-danger-light) solid;
      }

      .${elPersistentNotificationIcon} {
        background: var(--intent-danger-light);
        border: 2px var(--intent-danger-light) solid;

        svg {
          color: var(--intent-danger);
        }
      }
    }
  }
`
