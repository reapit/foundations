import * as React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { MarkerComponent, MarkerComponentProps } from '../marker-component'

describe('Marker Component', () => {
  it('Should match snapshot', () => {
    const props: MarkerComponentProps = {
      markerOnClick: jest.fn(),
      marker: {
        lng: 1,
        lat: 1,
        id: '1',
        address1: '1',
        address2: '1'
      }
    }
    expect(toJson(shallow(<MarkerComponent {...props} />))).toMatchSnapshot()
  })
})
