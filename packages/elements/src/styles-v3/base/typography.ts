import { css } from 'linaria'

// Text align
export const elTextLeft = css`
  text-align: left;
`

export const elTextCenter = css`
  text-align: center;
`

export const elTextRight = css`
  text-align: right;
`

export const elTextJustify = css`
  text-align: justify;
`

// Font weight
export const elFontBold = css`
  font-weight: 700;
`

export const fontFace = css`
  :global() {
    @import url('https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap');
  }
`
