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

export const ComingSoonItem = styled.div`
  position: relative;
  border-radius: 4px;
  height: 14.8rem;
  border-radius: 4px;
  color: #000;
  max-width: 100%;
  position: relative;
  background-color: #f2f2f2;
  box-shadow: 2px 4px 20px rgb(0 0 0 / 5%);
`

export const ComingSoonImage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #fff;

  img {
    height: 80%;
    margin: auto;
  }

  a {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`

export const ComingSoonTitle = styled.div`
  position: absolute;
  padding: 0.25rem 0.5rem;
  background-color: #ffe5c7;
  z-index: 1;
  font-size: 0.875rem;
  border-radius: 4px;
`

export const ComingSoonInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 1.5rem;
`

export const ComingSoonImageWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #fff;
  height: 100%;
`

export const CategoryTitle = styled.div`
  padding: 4px;
  display: flex;
  justify-content: center;
  background-color: #ffe5c7;
  font-size: 0.875rem;
  border-radius: 0 0 4px 4px;

  svg {
    margin-right: 0.5rem;
    margin-top: 0.25rem;
  }
`
