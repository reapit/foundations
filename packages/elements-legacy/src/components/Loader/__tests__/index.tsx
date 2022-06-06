import * as React from 'react'
import { render } from '@testing-library/react'
import { Loader, LoaderProps } from '../index'

const props = (body: boolean): LoaderProps => ({
  body,
  dataTest: 'some-selector',
})

describe('Loader', () => {
  it('should match a snapshot when BODY true', () => {
    expect(render(<Loader {...props(true)} />)).toMatchSnapshot()
  })

  it('should match a snapshot when BODY false', () => {
    expect(render(<Loader {...props(false)} />)).toMatchSnapshot()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
