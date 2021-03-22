import { styled } from 'linaria/react'

export const CardHeading = styled.h5`
  font-size: 20px;
  line-height: 24px;
  min-height: 3.5rem;
`

export const CardSubHeading = styled.h6`
  color: #646464;
`

export const CardSubHeadingAdditional = styled.h6`
  color: #646464;
  font-weight: bold;
  height: 1rem;
  margin-bottom: 2rem;
`

export const CardBodyWrap = styled.div`
  p,
  div,
  section {
    color: #646464;
  }
`

export const CardImageWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f2f2f2;
  padding: 1rem;
  margin-right: 1rem;
`
