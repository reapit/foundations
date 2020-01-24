import * as React from 'react'
import { shallow } from 'enzyme'
import { Loader, LoaderProps } from '../index'
import toJson from 'enzyme-to-json'

const props = (body: boolean): LoaderProps => ({
  body,
  dataTest: 'some-selector'
})

describe('Loader', () => {
  it('should match a snapshot when BODY true', () => {
    expect(toJson(shallow(<Loader {...props(true)} />))).toMatchSnapshot()
  })

  it('should match a snapshot when BODY false', () => {
    expect(toJson(shallow(<Loader {...props(false)} />))).toMatchSnapshot()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
