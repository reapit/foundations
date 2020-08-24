import { css } from 'linaria'

// layout
export const layoutBase = '1rem'
export const layoutQuarter = 'calc(1rem / 4)'
export const layoutThird = 'calc(1rem / 3)'
export const layoutHalf = 'calc(1rem / 2)'
export const layoutTwoThird = 'calc(1rem * 0.67)'
export const layoutThreeQuarter = 'calc(1rem * 0.75)'
export const layoutOneQuarter = 'calc(1rem * 1.25)'
export const layoutOneHalf = 'calc(1rem * 1.5)'
export const layoutDouble = 'calc(1rem * 2)'
export const layoutTwoHalf = 'calc(1rem * 2.5)'
export const layoutTriple = 'calc(1rem * 3)'
export const layoutQuadruple = 'calc(1rem * 4)'
export const layoutSextuple = 'calc(1rem * 6)'
// color
export const white = '#fff'
export const black = '#12263f'
export const greyDark = '#6e84a3'
export const grey = '#95aac9'
export const greyLighter = '#e3ebf6'
export const greyLightest = '#f9fbfd'
export const green = '#5fe781'
export const greenLighter = '#acf2bd'
export const greenLightest = '#e6ffed'
export const red = '#e96171'
export const redLighter = '#fdb8c0'
export const redLightest = '#ffeef0'
export const reapitDarkblue = '#262f69'
export const reapitMidblue = '#0061a8'
export const reapitLightblue = '#23a4de'
export const reapitLightestblue = '#7bc9eb'
export const reapitOrange = '#ec631b'
export const reapitLime = '#cddb00'
export const reapitTeal = '#006580'
export const reapitPlumb = '#7a2c81'
export const reapitPurple = '#a4185c'
export const reapitGold = '#ffb71b'
export const reapitGreen = '#a0c862'
export const reapitRed = '#d3033d'

export const globals = css`
  :global() {
    @font-face {
      font-family: 'Museo Sans W03_300';
      src: url('../../assets/fonts/1427936/f2cf6cf9-9ec6-4945-a525-f5873d143c2a.eot?#iefix');
      src: url('../../assets/fonts/1427936/f2cf6cf9-9ec6-4945-a525-f5873d143c2a.eot?#iefix') format('eot'),
        url('../../assets/fonts/1427936/9803fddf-c005-431a-92d5-0f18688f945d.woff2') format('woff2'),
        url('../../assets/fonts/1427936/ea9b8ac3-ff16-4387-a473-32a6a617329f.woff') format('woff'),
        url('../../assets/fonts/1427936/353acc2c-88f2-4de3-83eb-6cc2c9b05af1.ttf') format('truetype');
    }
    @font-face {
      font-family: 'Museo Sans W03_700';
      src: url('../../assets/fonts/1427944/1c070cdb-18d8-440e-be9d-2448fa3930c4.eot?#iefix');
      src: url('../../assets/fonts/1427944/1c070cdb-18d8-440e-be9d-2448fa3930c4.eot?#iefix') format('eot'),
        url('../../assets/fonts/1427944/66c06801-da3e-4587-a89c-674cfbe39c21.woff2') format('woff2'),
        url('../../assets/fonts/1427944/f3c7f613-9728-4ed6-a383-1c8519b215d2.woff') format('woff'),
        url('../../assets/fonts/1427944/c21bf502-6b58-4bf0-9ddd-169929c263e7.ttf') format('truetype');
    }
  }
  @import url('https://fonts.googleapis.com/css?family=Source+Code+Pro&display=swap');
  @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

  #root {
    height: 100%;
  }
`
