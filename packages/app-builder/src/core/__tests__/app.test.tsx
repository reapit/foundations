import * as React from 'react'
import { render, screen } from '@testing-library/react'
import App from '../app'

jest.mock('../router')

describe('App', () => {
  it('should render without crashing', () => {
    const app = render(<App />)
    app.unmount()
  })

  it('should match a snapshot', () => {
    render(<App />)
    expect(screen).toMatchSnapshot()
  })
})
