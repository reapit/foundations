import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { MOBILE_BREAKPOINT } from '../viewport/__styles__/media'

export const indicator = css`
  height: 30px;
  margin-top: -29px;
  font-size: 12px;
  line-height: 12px;
  color: white;
  position: absolute;
  background: var(--intent-primary);

  svg {
    fill: #fff;
    width: 15px;
    height: 15px;
  }
`

export const componentSelected = css`
  position: relative;
  &:after {
    content: '';
    border: 1px dashed var(--intent-primary);
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    pointer-events: none;
    display: block;
    box-sizing: border-box;
  }
`

export const littleButton = css`
  padding: 0 0px;
  opacity: 0.9;
  display: flex;
  align-items: center;
  :hover {
    color: white !important;
  }
  > div {
    position: relative;
    top: -50%;
    left: -50%;
  }
`

export const HeaderContainer = styled.header`
  grid-column: span 12;
  border-radius: 4px;

  grid-area: header;
`

export const FooterContainer = styled.footer`
  grid-column: span 12;
  border-radius: 4px;

  grid-area: footer;
`

export const BodyContainer = styled.section`
  margin-top: 20px;
  margin-bottom: 20px;
  grid-column: span 12;
  border-radius: 4px;

  grid-area: body;
`

export const NavigationContainer = styled.div`
  grid-area: nav;
`

export const RootContainer = styled.section`
  width: 100%;
  > div {
    display: grid;
    grid-template-areas:
      'nav header header'
      'nav body body'
      'nav footer footer';
    grid-template-columns: 1fr 9fr;

    @media (max-width: ${MOBILE_BREAKPOINT}px) {
      grid-template-columns: 12fr;
      grid-template-areas:
        'nav'
        'header'
        'body'
        'footer';
    }
  }
`
