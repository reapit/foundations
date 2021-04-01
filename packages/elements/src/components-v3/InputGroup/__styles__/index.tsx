import { styled } from 'linaria/react'
import { ElIcon } from '../../Icon/__styles__'
import { ElLabel } from '../../Label/__styles__'
import { ElInput } from '../../Input/__styles__'
import { ElAfterInputText } from '../../AfterInputText/__styles__'
import { inputBg, inputFocusBg, inputShadow } from '../../Input/__styles__'

export const ElInputGroup = styled.div`
  display: flex;
  flex-wrap: wrap;

  ${ElLabel} {
    background: ${inputBg};
    order: 1;
    flex-basis: 100%;
  }

  ${ElIcon} {
    background: ${inputBg};
    box-shadow: ${inputShadow};
    padding-left: 0.5rem;
    align-items: center;
    order: 2;
  }

  ${ElInput} {
    order: 3;

    &:focus {
      ~ ${ElIcon}, ~ ${ElLabel}, ~ ${ElAfterInputText} {
        background: ${inputFocusBg};
      }
    }
  }

  ${ElAfterInputText} {
    background: ${inputBg};
    box-shadow: ${inputShadow};
    padding-right: 0.5rem;
    align-items: center;
    display: flex;
    order: 4;
  }
`
