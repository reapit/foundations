const commonVariables = {
  // appointment-bookings's specific styles
  dateCellHeaderBackgroundColor: '#ececec',
  timeCellBackgroundColor: '#dfdfdf',
  timeCellBackgroundColorHover: '#d3d3d3',
  timeCellsContainerBackgroundColor: '#f9f9f9',
  formLabelColor: '#737373',
  formHrSeparatorFontColor: '#e6e6e6',
  formButtonFontSize: '1.2rem',
  //search widget
  searchPlaceholder: 'e.g. London or EC1N',
}

const variantA = {
  baseBackgroundColor: '#fff',
  basefontSize: '16px',
  basefontColor: '#556986',
  inverseFontColor: '#fff',
  secondaryfontColor: '#95aac9',
  primaryHeadingFontSize: '22px',
  secondaryHeadingFontSize: '18px',
  baseFontFamily: '"Open Sans", sans-serif',
  headingFontFamily: '"Montserrat", sans-serif',
  primaryAccentColor: '#887e96',
  secondaryAccentColor: '#7d9d88',
  mapAccentColor: '',
  breakPoints: {
    mobile: '',
    tablet: '',
    laptop: '',
    desktop: '',
  },
  ...commonVariables,
}

const variantB = {
  baseBackgroundColor: '#f9fbfd',
  basefontSize: '14px',
  basefontColor: '#12263f',
  inverseFontColor: '#f9fbfd',
  secondaryfontColor: '#1e2554',
  primaryHeadingFontSize: '24px',
  secondaryHeadingFontSize: '20px',
  baseFontFamily: '"Roboto", sans-serif',
  headingFontFamily: '"Open Sans", sans-serif',
  primaryAccentColor: '#0061a8',
  secondaryAccentColor: '#1e2554',
  mapAccentColor: '#7bc9eb',
  breakPoints: {
    mobile: '',
    tablet: '',
    laptop: '',
    desktop: '',
  },
  ...commonVariables,
}

const variantC = {
  baseBackgroundColor: '#4C566A',
  basefontSize: '14px',
  basefontColor: '#fff',
  inverseFontColor: '#4C566A',
  secondaryfontColor: '#88C0D0',
  primaryHeadingFontSize: '28px',
  secondaryHeadingFontSize: '24px',
  baseFontFamily: '"Open Sans", sans-serif',
  headingFontFamily: '"Roboto Slab", serif',
  primaryAccentColor: '#A3BE8C',
  secondaryAccentColor: '##88C0D0',
  mapAccentColor: '#8FBCBB',
  breakPoints: {
    mobile: '',
    tablet: '',
    laptop: '',
    desktop: '',
  },
  ...commonVariables,
}

const params = new URLSearchParams(window.location.search)

const variant = params.get('variant')

switch (variant) {
  case 'A':
    window.theme = variantA
    break
  case 'B':
    window.theme = variantB
    break
  case 'C':
    window.theme = variantC
    break
  default:
    window.theme = variantA
}
