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
  margin-bottom: 20px;
  grid-column: span 12;
  border-radius: 4px;
  padding-top: 8px;
  background: white;

  grid-area: body;
`

export const NavigationContainer = styled.div`
  grid-area: nav;
  display: flex;
  padding-top: 46px;
  background: white;
`

export const RootContainer = styled.section<{ expandNav: boolean; showNav: boolean }>`
  width: calc(100vw - 15px); /* allow for scrollbar */
  > div {
    display: grid;
    grid-template-areas: 'nav body';
    transition: all 0.35s;
    grid-template-columns: ${({ expandNav, showNav }) => {
      if (showNav) {
        if (expandNav) {
          return 'calc(80px + 14rem) 9fr'
        } else {
          return '80px 9fr'
        }
      }
      return '0px 9fr'
    }};

    @media (max-width: ${MOBILE_BREAKPOINT}px) {
      grid-template-columns: 12fr;
      grid-template-areas:
        'nav'
        'body';
    }
  }
`
