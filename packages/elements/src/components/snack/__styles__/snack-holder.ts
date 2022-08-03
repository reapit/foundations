import { styled } from '@linaria/react'
import { ElSnack } from '.'

export const ElSnackHolder = styled.div`
  position: fixed;
  z-index: 100;
  top: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  ${ElSnack} {
    display: flex;
    margin-bottom: 1rem;
    box-shadow: 3px 3px 5px var(--color-grey-medium);
  }
`
