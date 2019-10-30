export interface Theme {
  base: Base
  button: Button
  colors: Colors
  searchWidget: SearchWidget
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
  searchResult: string
  primary: string
  secondary: string
  icon: string
  base: string
  widgetHeading: string
  background: string
  warning: string
  loading: string
}

export interface SearchWidget {
  backgroundColor: string
}

export const theme: Theme = {
  searchWidget: {
    backgroundColor: 'rgba(124, 160, 145, 0.7)'
  },
  base: {
    font: {
      family: "'Open Sans', sans-serif",
      sizes: {
        base: '1.5rem',
        headings: {
          h1: '3rem',
          h2: '2.2rem',
          h3: '2.0rem',
          h4: '1.8rem',
          h5: '1.6rem'
        }
      }
    }
  },
  button: {
    background: '#887d97',
    color: '#ffffff'
  },
  colors: {
    searchResult: '#7ca091',
    primary: '#887d97 ',
    secondary: '#828085',
    icon: 'gray',
    base: '#12263f',
    widgetHeading: '#ffffff',
    background: '#ffffff',
    warning: '#d3033d',
    loading: '#95aac9'
  }
}
