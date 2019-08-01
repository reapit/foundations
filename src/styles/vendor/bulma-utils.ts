import bulma from '@/styles/vendor/bulma'

const bulmaUtils = {
  isResponsiveColumn:
    `${bulma.column} ${bulma.isMultiLine} ${bulma.isFullTablet} ${bulma.isHalfDesktop} ${bulma.isThirdWidescreen} ${
      bulma.isQuarterFullhd
    }` || 'isResponsiveColumn'
}

export default bulmaUtils
