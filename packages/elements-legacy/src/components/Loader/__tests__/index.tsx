import * as React from 'react'
import { render } from '../../../tests/react-testing'
import { Loader, LoaderProps } from '../index'
import toJson from 'enzyme-to-json'

const props = (body: boolean): LoaderProps => ({
  body,
  dataTest: 'some-selector',
})

describe('Loader', () => {
  it('should match a snapshot when BODY true', () => {
    expect(toJson(render(<Loader {...props(true)} />))).toMatchSnapshot()
  })

  it('should match a snapshot when BODY false', () => {
    expect(toJson(render(<Loader {...props(false)} />))).toMatchSnapshot()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
