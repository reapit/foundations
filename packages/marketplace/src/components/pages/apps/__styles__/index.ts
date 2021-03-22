import { css } from 'linaria'
import { styled } from 'linaria/react'

export const appList = css`
  width: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  margin: -1rem;
  padding: 1rem;
  &::-webkit-scrollbar {
    display: none;
  }
`

export const ComingSoonContainer = styled.div`
  display: flex;
  flex-flow: wrap;
`

export const ComingSoonItem = styled.div`
  width: 20%;
  padding: 1.5rem;
`

export const ComingSoonImage = styled.div`
  width: 100%;
  overflow: hidden;
  box-shadow: 2px 4px 20px rgba(0, 0, 0, 0.05);

  img,
  a {
    margin: 0 -25%;
    width: 177.777%;
  }
`
