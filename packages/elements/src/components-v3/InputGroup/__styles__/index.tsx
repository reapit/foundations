import { styled } from 'linaria/react'
import { ElIcon } from '../../Icon/__styles__'
import { ElLabel } from '../../Label/__styles__'
import { ElInput } from '../../Input/__styles__'
import { ElAfterInputText } from '../../AfterInputText/__styles__'

export const ElInputGroup = styled.div`
  display: flex;
  flex-wrap: wrap;

  ${ElLabel} {
    background: var(--component-input-bg);
    order: 1;
    flex-basis: 100%;
    padding-left: 0.5rem;
  }

  ${ElIcon} {
    background: var(--component-input-bg);
    box-shadow: var(--component-input-shadow);
    padding-left: 0.5rem;
    align-items: center;
    order: 2;
  }

  ${ElInput} {
    order: 3;
  }

  ${ElInput}:not([type='checkbox']):not([type='radio']) {
    &:focus {
      ~ ${ElIcon}, ~ ${ElLabel}, ~ ${ElAfterInputText} {
        background: var(--component-input-focus-bg);
      }
    }
  }

  ${ElAfterInputText} {
    background: var(--component-input-bg);
    box-shadow: var(--component-input-shadow);
    padding-right: 0.5rem;
    align-items: center;
    display: flex;
    order: 5;
  }

  ${ElInput}[type='checkbox'], ${ElInput}[type='radio'] {
    ~ ${ElIcon} {
      box-shadow: none;
      padding-left: 0;
      padding-right: 0.5rem;
    }
    ~ ${ElAfterInputText} {
      box-shadow: none;
      padding-left: 0.5rem;
      flex-grow: 1;
    }

    &:checked {
      ~ ${ElIcon}, ~ ${ElLabel}, ~ ${ElAfterInputText} {
        background: var(--component-input-focus-bg);
      }
    }
  }

  ${ElInput}[type='checkbox'] {
    ~ ${ElLabel} {
      padding-left: 0;
      padding-bottom: 0.5rem;
    }
  }

  ${ElInput}[type='radio'] ~ ${ElLabel} {
    order: 4;
    flex-basis: auto;
    flex-grow: 1;
    display: flex;
    align-items: center;
  }
`
