import bulma from '@/styles/vendor/bulma'

const bulmaUtils = {
  isResponsiveColumn:
    `${bulma.column} ${bulma.isMultiLine} ${bulma.isHalfTablet} ${bulma.isThirdDesktop} ${bulma.isQuarterWidescreen} ${
      bulma.isQuarterFullhd
    }` || 'isResponsiveColumn'
}

export default bulmaUtils
