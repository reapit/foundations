// TODO - a start on theming - needs some work - ideally, should look like Elements itself
export default {
  typescript: true,
  showDarkModeSwitch: false,
  themeConfig: {
    colors: {
      text: '#3b454e',
      background: '#fff',
      primary: '#0061a8',
    },
    prism: {
      plain: {
        fontFamily: '"Source Code Pro", monospace',
        color: '#393A34',
        backgroundColor: '#f5f7f9',
      },
    },
    fonts: {
      body: '"Roboto", sans-serif',
      heading: '"Roboto", sans-serif',
      monospace: '"Source Code Pro", monospace',
    },
    radii: {
      square: 0,
      radius: 0,
      rounded: 0,
    },
    styles: {
      h1: {
        fontSize: '2rem',
        fontFamily: 'heading',
        fontWeight: 'heading',
        color: 'text',
        mt: 0,
        mb: 4,
      },
      code: {
        fontFamily: '"Source Code Pro", monospace',
      },
      inlineCode: {
        fontFamily: '"Source Code Pro", monospace',
      },
      pre: {
        my: 4,
        p: 3,
        variant: 'prism',
        textAlign: 'left',
        fontFamily: '"Source Code Pro", monospace',
        borderRadius: 'radius',
      },
    },
  },
}
