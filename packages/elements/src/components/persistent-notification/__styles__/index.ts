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

export const elPnIsFullWidth = css``

export const elPnIsFixed = css``

export const elPnIsInline = css``

export const elPnIcon = css`
  padding: 0 0.5rem;
  display: flex;
  align-items: center;
  border-radius: var(--default-border-radius) 0 0 var(--default-border-radius);
  cursor: pointer;

  ${ElIcon} {
    color: var(--color-white);
  }
`

export const elPnContent = css`
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

  &.${elIntentPrimary} {
    .${elPnContent} {
      background: var(--intent-primary-light);
      color: var(--intent-primary-light-text);
    }

    .${elPnIcon} {
      background: var(--intent-primary);
      color: var(--intent-primary-text);
    }

    &.${elPnIsInline} {
      .${elPnContent} {
        background: var(--color-white);
        border: 2px var(--intent-primary-light) solid;
      }

      .${elPnIcon} {
        background: var(--intent-primary-light);
        border: 2px var(--intent-primary-light) solid;

        svg {
          color: var(--intent-primary);
        }
      }
    }
  }

  &.${elIntentSecondary} {
    .${elPnContent} {
      background: var(--intent-secondary-light);
      color: var(--intent-secondary-light-text);
    }
    .${elPnIcon} {
      background: var(--intent-secondary);
      color: var(--intent-secondary-text);
    }

    &.${elPnIsInline} {
      .${elPnContent} {
        background: var(--color-white);
        border: 2px var(--intent-secondary-light) solid;
      }

      .${elPnIcon} {
        background: var(--intent-secondary-light);
        border: 2px var(--intent-secondary-light) solid;

        svg {
          color: var(--intent-secondary);
        }
      }
    }
  }

  &.${elIntentCritical} {
    .${elPnContent} {
      background: var(--intent-critical-light);
      color: var(--intent-critical-light-text);
    }

    .${elPnIcon} {
      background: var(--intent-critical);
      color: var(--intent-critical-text);
    }

    &.${elPnIsInline} {
      .${elPnContent} {
        background: var(--color-white);
        border: 2px var(--intent-critical-light) solid;
      }

      .${elPnIcon} {
        background: var(--intent-critical-light);
        border: 2px var(--intent-critical-light) solid;

        svg {
          color: var(--intent-critical);
        }
      }
    }
  }

  &.${elIntentSuccess} {
    .${elPnContent} {
      background: var(--intent-success-light);
      color: var(--intent-success-light-text);
    }

    .${elPnIcon} {
      background: var(--intent-success);
      color: var(--intent-success-text);
    }

    &.${elPnIsInline} {
      .${elPnContent} {
        background: var(--color-white);
        border: 2px var(--intent-success-light) solid;
      }

      .${elPnIcon} {
        background: var(--intent-success-light);
        border: 2px var(--intent-success-light) solid;

        svg {
          color: var(--intent-success);
        }
      }
    }
  }

  &.${elIntentDanger} {
    .${elPnContent} {
      background: var(--intent-danger-light);
      color: var(--intent-danger-light-text);
    }

    .${elPnIcon} {
      background: var(--intent-danger);
      color: var(--intent-danger-text);
    }

    &.${elPnIsInline} {
      .${elPnContent} {
        background: var(--color-white);
        border: 2px var(--intent-danger-light) solid;
      }

      .${elPnIcon} {
        background: var(--intent-danger-light);
        border: 2px var(--intent-danger-light) solid;

        svg {
          color: var(--intent-danger);
        }
      }
    }
  }
`
