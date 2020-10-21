import { css } from 'linaria'
import { greyLight, reapitGreen } from '@/core/__styles__/colors'
import { forMobileOnly, forIEOnly, forTabletAndBelow } from '@/core/__styles__/media'

export const preview = css`
  position: relative;
  top: 2px;
`
export const check = css`
  position: relative;
  top: 2px;
  left: 2px;
  color: ${reapitGreen};
  margin-right: 2px;
`
export const tag = css`
  display: inline-block;
  padding: 0.5rem 1rem;
  background: ${greyLight};
  margin: 0.5rem 0.5rem 0 0;
`
export const container = css`
  height: 100%;
  margin-bottom: auto;
  ${forMobileOnly} {
    display: flex;
    flex-direction: column-reverse;
  }
  ${forIEOnly} {
    min-width: 1024px;
  }
`
export const containerHeader = css`
  display: flex;
  align-items: center;
  flex-direction: column;
`
export const appIconContainer = css`
  width: 96px;
  height: auto;
  margin: 0 auto;
`
export const headerContent = css`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  align-items: center;
  text-align: center;
`
export const containerOuterHeader = css`
  ${forTabletAndBelow} {
    flex-direction: column;
  }
`
export const buttonGroup = css`
  display: flex;
  flex-direction: column;
  ${forMobileOnly} {
    > button {
      width: 50%;
    }
    flex-direction: row;
  }
`
