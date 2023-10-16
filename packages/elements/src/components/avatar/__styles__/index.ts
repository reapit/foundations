import { css } from '@linaria/core'
import { styled } from '@linaria/react'

export const elAvatarSmall = css``

export const ElAvatar = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  background-color: var(--color-grey-100);
  margin-right: 0.5rem;
  border-radius: 50%;
  overflow: hidden;
  width: 2.5rem;
  height: 2.5rem;

  &.${elAvatarSmall} {
    width: 2rem;
    height: 2rem;

    img {
      max-width: 2rem;
    }
  }

  img {
    max-width: 2.5rem;
  }
`

export const ElAvatarImage = styled(ElAvatar)`
  border-radius: 0;
  width: 4.5rem;
  height: 3.25rem;

  img {
    max-width: 4.5rem;
  }
`
