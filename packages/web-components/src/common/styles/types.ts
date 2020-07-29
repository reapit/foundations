export interface ThemeBaseInitializer {
  baseBackgroundColor: string
  basefontSize: string
  basefontColor: string
  inverseFontColor: string
  secondaryfontColor: string
  primaryHeadingFontSize: string
  secondaryHeadingFontSize: string
  baseFontFamily: string
  headingFontFamily: string
  primaryAccentColor: string
  secondaryAccentColor: string
  mapAccentColor: string
  breakPoints: {
    mobile: string
    tablet: string
    laptop: string
    desktop: string
  }
  searchPlaceholder: string
}

export interface ThemeBaseClasses {
  featureLabel: string
  featureButton: string
  globalStyles: string
  primaryHeading: string
  secondaryHeading: string
  primaryStrapline: string
  secondaryStrapline: string
  selectedItem: string
  bodyText: string
  button: string
  input: string
  resultItem: string
  searchBox: string
  offerBanner: string
  pagination: string
  paginationActive: string
  formError: string
}

export interface ThemeBookingClasses extends ThemeBaseClasses {
  timeCell: string
  svgNavigation: string
  dateCellHeader: string
  timeCellsContainer: string
  formBlock: string
  formInput: string
  formHeader: string
  formLabel: string
  formSeparator: string
  formButtonPrimary: string
  formButtonSecondary: string
  formError: string
}

export interface ThemeBookingInitializer extends ThemeBaseInitializer {
  timeCellBackgroundColor: string
  timeCellBackgroundColorHover: string
  navigateButtonColor: string
  dateCellHeaderBackgroundColor: string
  timeCellsContainerBackgroundColor: string
  formLabelColor: string
  formHrSeparatorFontColor: string
  formButtonFontSize: string
}
