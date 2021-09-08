import { js } from './js'
import { lint } from './format'

export const generateIndex = () => {
  return lint(js`
    import React from 'react'
    import { render } from 'react-dom'
    import App from './app'

    const rootElement = document.querySelector('#root') as Element
    if (rootElement) {
      render(<App />, rootElement)
    }
  `)
}
