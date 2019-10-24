export interface Theme {
  base: Base
  button: Button
  colors: Colors
}

export interface Base {
  font: Font
}

export interface Font {
  family: string
  sizes: Sizes
}

export interface Sizes {
  base: string
  headings: Headings
}

export interface Headings {
  h1: string
  h2: string
  h3: string
  h4: string
  h5: string
}

export interface Button {
  background: string
  color: string
}

export interface Colors {
  primary: string
  secondary: string
  icon: string
  base: string
  widgetHeading: string
  background: string
  warning: string
  loading: string
}

export const theme: Theme = {
  base: {
    font: {
      family: "'Open Sans', sans-serif",
      sizes: {
        base: '1.5rem',
        headings: {
          h1: '2.4rem',
          h2: '2.2rem',
          h3: '2.0rem',
          h4: '1.8rem',
          h5: '1.6rem'
        }
      }
    }
  },
  button: {
    background: '#ffffff',
    color: '#12263f'
  },
  colors: {
    primary: '#00a569',
    secondary: '#828085',
    icon: 'gray',
    base: '#12263f',
    widgetHeading: '#ffffff',
    background: '#ffffff',
    warning: '#d3033d',
    loading: '#95aac9'
  }
}
