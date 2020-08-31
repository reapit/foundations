import { css } from 'linaria'

export const WHITE = '#fff'
export const BLACK = '#3b454e'
export const GREY = '#74818d'
export const GREY_LIGHT = '#f5f7f9'
export const GREEN_LIGHTER = '#acf2bd'
export const RED_LIGHTER = '#fdb8c0'
export const REAPIT_MID_BLUE = '#0061a8'

export const globals = css`
  :global() {
    @import url('https://fonts.googleapis.com/css?family=Source+Code+Pro&display=swap');
    @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

    #root {
      height: 100%;
    }
  }
`
