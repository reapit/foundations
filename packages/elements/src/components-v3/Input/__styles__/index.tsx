import { styled } from 'linaria/react'
import { ElIcon } from '../../Icon/__styles__'

export const ElInput = styled.input`
  display: flex;
  color: black;
  padding: 0.5rem;
  border: none;
  background: #ffffff;
  box-shadow: inset 0px -1px 0px #000000;

  + ${ElIcon} {
    box-shadow: inset 0px -1px 0px #000000;
  }

  &:focus {
    outline: none;
    background: var(--color-grey-light);

    + ${ElIcon} {
      background: var(--color-grey-light);
    }
  }
`

export const ElInputWithIconContainer = styled.div`
  display: flex;

  ${ElIcon} {
    padding-left: 0.5rem;
    align-items: center;
    order: -1;
  }
`
