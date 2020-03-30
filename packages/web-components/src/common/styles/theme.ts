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
}

export interface ThemeStyles {
  globalStyles: string
  primaryHeading: string
  secondaryHeading: string
  primaryStrapline: string
  secondaryStrapline: string
  selectedItem: string
  bodyText: string
  button: string
  input: string
}

export const generateThemeStyles = ({
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
}: Partial<InitializerTheme>): ThemeStyles => ({
  globalStyles: css`
    font-size: ${basefontSize || '16px'};
    font-family: ${baseFontFamily || 'Helvetica, Arial, sans-serif'};
    background: ${baseBackgroundColor || '#fff'};
    color: ${basefontColor || '#000'};
  `,
  primaryHeading: css`
    font-family: ${headingFontFamily || 'Helvetica, Arial, sans-serif'} !important;
    font-size: ${primaryHeadingFontSize || '22px'} !important;
    font-weight: bold !important;
    color: ${primaryAccentColor || basefontColor || '#000'} !important;
    margin-bottom: 0.1em !important;
  `,
  secondaryHeading: css`
    font-family: ${headingFontFamily || 'Helvetica, Arial, sans-serif'} !important;
    font-size: ${secondaryHeadingFontSize || '18px'} !important;
    font-weight: bold !important;
    color: ${secondaryAccentColor || basefontColor || '#000'} !important;
    margin-bottom: 0.1em !important;
  `,
  primaryStrapline: css`
    font-family: ${headingFontFamily || 'Helvetica, Arial, sans-serif'} !important;
    font-size: ${secondaryHeadingFontSize || '18px'} !important;
    font-weight: bold !important;
    color: ${secondaryfontColor || basefontColor || 'grey'} !important;
    margin-bottom: 0.5em !important;
  `,
  secondaryStrapline: css`
    font-family: ${headingFontFamily || 'Helvetica, Arial, sans-serif'} !important;
    font-size: ${basefontSize || '16px'} !important;
    font-weight: bold !important;
    color: ${secondaryfontColor || basefontColor || 'grey'} !important;
    margin-bottom: 0.5em !important;
  `,
  selectedItem: css`
    border: 1px solid ${primaryAccentColor || 'grey'} !important; 
  `,
  bodyText: css`
    font-size: ${basefontSize || '16px'} !important;
    font-family: ${baseFontFamily || 'Helvetica, Arial, sans-serif'} !important;
    margin-bottom: 1em !important;
  `,
  button: css`
    font-family: ${baseFontFamily || 'Helvetica, Arial, sans-serif'} !important;
    font-size: ${secondaryHeadingFontSize || '18px'} !important;
    color: ${primaryAccentColor || '#000'} !important;
    border: 1px solid ${primaryAccentColor || 'grey'} !important;
    background: ${baseBackgroundColor || '#fff'} !important;

    &:hover {
      background: ${primaryAccentColor || 'grey'} !important;
      color: ${inverseFontColor || '#fff'} !important;
    }

    :last-child {
      border-left: none !important;
    }
  `,
  input: css`
    font-family: ${baseFontFamily || 'Helvetica, Arial, sans-serif'} !important;
    font-size: ${secondaryHeadingFontSize || '18px'} !important;
    border: 1px solid ${primaryAccentColor || 'grey'} !important;
  `,
})

export const generateMapStyles = ({ mapAccentColor }: Partial<InitializerTheme>) => [
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
