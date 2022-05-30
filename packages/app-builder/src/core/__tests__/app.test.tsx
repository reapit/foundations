import * as React from 'react'
import { render } from '@testing-library/react'
import App from '../app'

jest.mock('../router')

describe('App', () => {
  it('should render without crashing', () => {
    const app = render(<App />)
    app.unrender()
  })

  it('should match a snapshot', () => {
    const { asFragment } = render(<App />)
    expect(asFragment()).toMatchSnapshot()
  })
})
