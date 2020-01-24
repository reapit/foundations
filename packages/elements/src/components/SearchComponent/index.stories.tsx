import React from 'react'
import { storiesOf } from '@storybook/react'
import SearchComponent from '.'

storiesOf('SearchComponent', module)
  .add('Default Theme', () => {
    return <SearchComponent />
  })
  .add('Custom Theme', () => {
    const theme = {
      base: {
        font: {
          family: 'arial',
          sizes: {
            headings: {
              h1: '7rem',
              h2: '6rem',
              h3: '5rem',
              h4: '4rem',
              h5: '3rem',
              h6: '2rem'
            }
          }
        }
      },
      button: {
        background: 'green'
      },
      colors: {
        base: 'white',
        primary: 'yellow',
        inputBackgroundColor: 'red',
        widgetHeading: 'orange'
      }
    }
    return <SearchComponent theme={theme} />
  })
