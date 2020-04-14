import { css } from 'emotion'

export interface InitializerTheme {
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
}

export interface ThemeClasses {
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
}

export const generateThemeClasses = (
  {
    baseBackgroundColor,
    basefontSize,
    basefontColor,
    inverseFontColor,
    baseFontFamily,
    primaryHeadingFontSize,
    secondaryHeadingFontSize,
    headingFontFamily,
    primaryAccentColor,
    secondaryfontColor,
    secondaryAccentColor,
    breakPoints,
  }: Partial<InitializerTheme>,
  parentSelector: string,
): ThemeClasses => {
  return {
    globalStyles: css`
      font-size: ${basefontSize || '16px'};
      font-family: ${baseFontFamily || 'Helvetica, Arial, sans-serif'};
      background: ${baseBackgroundColor || '#fff'};
      color: ${basefontColor || '#000'};
    `,
    primaryHeading: css`
      ${parentSelector || 'body'} & {
        font-family: ${headingFontFamily || 'Helvetica, Arial, sans-serif'};
        font-size: ${primaryHeadingFontSize || '22px'};
        font-weight: bold;
        color: ${primaryAccentColor || basefontColor || '#000'};
        margin-bottom: 0.2em;
      }
    `,
    secondaryHeading: css`
      ${parentSelector || 'body'} & {
        font-family: ${headingFontFamily || 'Helvetica, Arial, sans-serif'};
        font-size: ${secondaryHeadingFontSize || '18px'};
        font-weight: bold;
        color: ${secondaryAccentColor || basefontColor || '#000'};
        margin-bottom: 0.2em;
      }
    `,
    primaryStrapline: css`
      ${parentSelector || 'body'} & {
        font-family: ${headingFontFamily || 'Helvetica, Arial, sans-serif'};
        font-size: ${secondaryHeadingFontSize || '18px'};
        font-weight: bold;
        color: ${secondaryfontColor || basefontColor || 'grey'};
        margin-bottom: 0.5em;
      }
    `,
    secondaryStrapline: css`
      ${parentSelector || 'body'} & {
        font-family: ${headingFontFamily || 'Helvetica, Arial, sans-serif'};
        font-size: ${basefontSize || '16px'};
        font-weight: bold;
        color: ${secondaryfontColor || basefontColor || 'grey'};
        margin-bottom: 0.5em;
      }
    `,
    selectedItem: css`
      ${parentSelector || 'body'} & {
        border-color: ${primaryAccentColor || 'grey'};
      }
    `,
    bodyText: css`
      ${parentSelector || 'body'} & {
        font-size: ${basefontSize || '16px'};
        font-family: ${baseFontFamily || 'Helvetica, Arial, sans-serif'};
        margin-bottom: 1em;
      }
    `,
    button: css`
      ${parentSelector || 'body'} & {
        font-family: ${baseFontFamily || 'Helvetica, Arial, sans-serif'};
        font-size: ${secondaryHeadingFontSize || '18px'};
        color: ${primaryAccentColor || '#000'};
        border: 1px solid ${primaryAccentColor || 'grey'};
        background: ${baseBackgroundColor || '#fff'};
        color: ${inverseFontColor || 'grey'};

        &:hover {
          background: ${inverseFontColor || 'grey'};
          color: ${baseBackgroundColor || '#fff'};
        }

        &:last-child {
          border-left: none;
        }
      }
    `,
    input: css`
      ${parentSelector || 'body'} & {
        font-family: ${baseFontFamily || 'Helvetica, Arial, sans-serif'};
        font-size: ${secondaryHeadingFontSize || '18px'};
        border: 1px solid ${primaryAccentColor || 'grey'};
      }
    `,
    resultItem: css`
      ${parentSelector || 'body'} & {
        width: 100%;

        @media screen and (min-width: ${breakPoints?.desktop || '1200px'}) {
          & {
            width: 25%;
          }
        }

        @media screen and (min-width: ${breakPoints?.laptop || '960px'}) and (max-width: ${breakPoints?.desktop ||
            '1200px'}) {
          & {
            width: 33.333333%;
          }
        }

        @media screen and (min-width: ${breakPoints?.tablet || '768px'}) and (max-width: ${breakPoints?.laptop ||
            '960px'}) {
          & {
            width: 50%;
          }
        }
      }
    `,
    searchBox: css`
      ${parentSelector || 'body'} & {
        width: 100%;

        @media screen and (min-width: ${breakPoints?.laptop || '960px'}) {
          & {
            width: 33.333333%;
          }
        }

        @media screen and (min-width: ${breakPoints?.mobile || '560px'}) and (max-width: ${breakPoints?.laptop ||
            '960px'}) {
          & {
            width: 50%;
          }
        }
      }
    `,
    offerBanner: css`
      ${parentSelector || 'body'} & {
        background: ${primaryAccentColor || 'grey'};
        font-size: ${basefontSize || '16px'};
        font-family: ${baseFontFamily || 'Helvetica, Arial, sans-serif'};
        color: ${inverseFontColor || '#fff'};
      }
    `,
  }
}

export const generateMapStyles = ({ mapAccentColor }: Partial<InitializerTheme>) => {
  return [
    {
      featureType: 'all',
      elementType: 'geometry.fill',
      stylers: [
        {
          weight: '2.00',
        },
      ],
    },
    {
      featureType: 'all',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#9c9c9c',
        },
      ],
    },
    {
      featureType: 'all',
      elementType: 'labels.text',
      stylers: [
        {
          visibility: 'on',
        },
      ],
    },
    {
      featureType: 'landscape',
      elementType: 'all',
      stylers: [
        {
          color: '#f2f2f2',
        },
      ],
    },
    {
      featureType: 'landscape',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'landscape.man_made',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'all',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'all',
      stylers: [
        {
          saturation: -100,
        },
        {
          lightness: 45,
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#eeeeee',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#7b7b7b',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'all',
      stylers: [
        {
          visibility: 'simplified',
        },
      ],
    },
    {
      featureType: 'road.arterial',
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'transit',
      elementType: 'all',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'all',
      stylers: [
        {
          color: mapAccentColor || '#c8d7d4',
        },
        {
          visibility: 'on',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: mapAccentColor || '#c8d7d4',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#070707',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
  ]
}
