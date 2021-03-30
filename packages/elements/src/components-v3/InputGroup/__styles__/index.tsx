import { styled } from 'linaria/react'
import { ElIcon } from '../../Icon/__styles__'
import { ElLabel } from '../../Label/__styles__'
import { ElInput } from '../../Input/__styles__'
import { inputBg, inputFocusBg } from '../../Input/__styles__'

export const ElInputGroup = styled.div`
  display: flex;
  flex-wrap: wrap;

  ${ElLabel} {
    background: ${inputBg};
    order: 1;
    flex-basis: 100%;
    padding-left: 0.5rem;
  }

  ${ElIcon} {
    background: ${inputBg};
    box-shadow: inset 0px -1px 0px #000000;
    padding-left: 0.5rem;
    align-items: center;
    order: 2;
  }

  ${ElInput} {
    order: 3;

    &:focus {
      ~ ${ElIcon}, ~ ${ElLabel} {
        background: ${inputFocusBg};
      }
    }
  }
`
