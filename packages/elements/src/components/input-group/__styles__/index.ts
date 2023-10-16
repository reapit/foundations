import { styled } from '@linaria/react'
import { ElIcon } from '../../icon/__styles__'
import { ElLabel } from '../../label/__styles__'
import { ElInput } from '../../input/__styles__'
import { ElTextArea } from '../../textarea/__styles__'
import { ElSelect } from '../../select/__styles__'
import { ElInputAddOn } from '../../input-add-on/__styles__'
import { ElToggleRadioWrap, ElToggleLabel } from '../../toggle/__styles__'
import { ElMultiSelectInputWrapper } from '../../multi-select/__styles__'
import { ElInputError } from '../../input-error/__styles__'

export const ElInputGroup = styled.div`
  display: flex;
  flex-wrap: wrap;

  ${ElLabel} {
    order: 1;
    flex-basis: 100%;
    padding: 0 0.5rem 0.5rem 0;
  }

  ${ElIcon} {
    color: var(--color-grey-400);
    border: var(--component-input-border);
    border-right: none;
    border-radius: 0.125rem 0 0 0.125rem;
    padding-left: 0.5rem;
    align-items: center;
    order: 2;
  }

  ${ElInputAddOn} {
    border: var(--component-input-border);
    border-left: none;
    padding-right: 0.5rem;
    align-items: center;
    display: flex;
    order: 5;
  }

  ${ElMultiSelectInputWrapper} ${ElIcon} {
    border: none;
    order: 0;
    padding-left: 0;
  }

  ${ElInput}, ${ElTextArea}, ${ElSelect} {
    order: 3;
  }

  ${ElInputError} {
    order: 4;
    width: 100%;
  }

  ${ElInput}:not([type='checkbox']):not([type='radio']):has(~ ${ElIcon}) {
    border-left: none;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  ${ElInput}:not([type='checkbox']):not([type='radio']):has(~ ${ElInputAddOn}), ${ElTextArea}:has(~ ${ElInputAddOn}), ${ElSelect}:has(~ ${ElInputAddOn}) {
    border-right: none;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  ${ElInput}:not([type='checkbox']):not([type='radio']), ${ElTextArea}, ${ElSelect} {
    &:focus {
      ~ ${ElIcon}, ~ ${ElInputAddOn} {
        border-color: var(--intent-primary);
      }
    }

    &:disabled {
      ~ ${ElIcon}, ~ ${ElInputAddOn}, ~ ${ElLabel} {
        color: rgba(100, 100, 100, 0.35);
      }
    }
  }

  ${ElInput}[type='checkbox'], ${ElInput}[type='radio'] {
    ~ ${ElIcon} {
      box-shadow: none;
      padding-left: 0;
      padding-right: 0.5rem;
      border: none;
    }

    ~ ${ElInputAddOn} {
      box-shadow: none;
      padding-left: 0.5rem;
      border: none;
    }

    &:checked {
      ~ ${ElIcon}, ~ ${ElLabel}, ~ ${ElInputAddOn} {
        background: var(--color-white);
      }

      ~ ${ElInputAddOn} {
        color: var(--color-black);
      }
    }
  }

  ${ElInput}[type='checkbox'] {
    ~ ${ElLabel} {
      display: block;
    }
  }

  ${ElToggleRadioWrap}, ${ElToggleLabel}, ${ElMultiSelectInputWrapper} {
    order: 2;
    ~ ${ElLabel} {
      order: 1;
      padding: 0 0.5rem 0.5rem 0;
    }
  }

  ${ElInput}[type='radio'] ~ ${ElLabel} {
    order: 4;
    flex-basis: auto;
    flex-grow: 1;
    display: flex;
    align-items: center;
    padding: 0;
  }
`
