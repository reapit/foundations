import React from 'react'
import { render } from '@testing-library/react'
import App from '../app'
import { render as renderApp, unmountComponentAtNode } from 'react-dom'

jest.mock('../router')

describe('App', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div')
    renderApp(<App />, div)
    unmountComponentAtNode(div)
  })

  it('should match a snapshot', () => {
    expect(render(<App />)).toMatchSnapshot()
  })
})
