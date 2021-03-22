import { css } from 'linaria'
import { styled } from 'linaria/react'
import { black, reapitLightblue, white } from '@/core/__styles__/colors'

export const content = css`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  max-width: 700px;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 4.25rem;
`

export const directAPI = css`
  color: ${black};
  font-weight: 400;
  margin-left: 5px;
  white-space: nowrap;
`

export const bannerWrap = css`
  position: relative;
`

export const bannerOuter = css`
  width: 175px;
  height: 175px;
  overflow: hidden;
  position: absolute;
  z-index: 100;
`

export const bannerInner = css`
  font-family: 'PT Sans', Helvetica, sans-serif;
  font-weight: bold;
  font-size: 1rem;
  color: #333;
  text-align: center;
  transform: rotate(-45deg);
  position: relative;
  padding: 0.7rem 0;
  top: 35px;
  left: -60px;
  width: 230px;
  background-color: #0061a8;
  color: #fff;
`

export const bannerOuterSmall = css`
  width: 150px;
  height: 100px;
  overflow: hidden;
  position: absolute;
  z-index: 100;
`

export const bannerInnerSmall = css`
  font-family: 'Roboto', Helvetica, sans-serif;
  font-weight: bold;
  font-size: 0.75rem;
  color: #333;
  text-align: center;
  transform: rotate(-45deg);
  position: relative;
  padding: 0.5rem 0;
  top: 22px;
  left: -57px;
  width: 185px;
  background-color: #0061a8;
  color: #fff;
`

export const IsFree = styled.span`
  z-index: 50;
  color: ${white};
  font-size: 0.875rem;
  font-weight: bold;
  padding: 0.1rem 0.4rem;
  border-radius: 0.25rem;
  background: ${reapitLightblue};
  margin-left: 0.5rem;
`
