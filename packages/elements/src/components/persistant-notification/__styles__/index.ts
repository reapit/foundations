import { styled } from '@linaria/react'
import { elIsActive } from '../../../styles/states'
import {
  elIntentPrimary,
  elIntentSuccess,
  elIntentDanger,
  elIntentDefault,
  elIntentNeutral,
  elIntentPending,
  elIntentWarning,
} from '../../../styles/intent'
import { elPnContent, elPnIcon, elPnIsFixed, elPnIsFullWidth, elPnIsInline } from '../../persistent-notification'

export const ElPersistantNotification = styled.div`
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
