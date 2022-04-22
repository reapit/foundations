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
    background: var(--component-input-bg);
    order: 1;
    flex-basis: 100%;
    padding: 0.25rem 0 0 0.5rem;
  }

  ${ElIcon} {
    background: var(--component-input-bg);
    border-bottom: var(--component-input-border-bottom);
    padding-left: 0.5rem;
    align-items: center;
    order: 2;
  }

  ${ElMultiSelectInputWrapper} ${ElIcon} {
    background: var(--color-grey-light);
    border-bottom: none;
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

  ${ElInput}:not([type='checkbox']):not([type='radio']), ${ElTextArea}, ${ElSelect} {
    &:focus {
      ~ ${ElIcon}, ~ ${ElInputAddOn} {
        background: var(--component-input-focus-bg);
        border-bottom: var(--component-input-border-bottom-focus);
      }
    }

    &:disabled {
      ~ ${ElIcon}, ~ ${ElInputAddOn}, ~ ${ElLabel} {
        color: rgba(100, 100, 100, 0.35);
      }
    }
  }

  ${ElInputAddOn} {
    background: var(--component-input-bg);
    border-bottom: var(--component-input-border-bottom);
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
      border-bottom: none;
    }

    ~ ${ElInputAddOn} {
      box-shadow: none;
      padding-left: 0.5rem;
      flex-grow: 1;
      border-bottom: none;
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
    margin-left: 0.5rem;
    ~ ${ElLabel} {
      padding-bottom: 0.25rem;
    }
  }

  ${ElToggleRadioWrap}, ${ElToggleLabel}, ${ElMultiSelectInputWrapper} {
    order: 2;
    ~ ${ElLabel} {
      order: 1;
      padding: 0.125rem 0;
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
