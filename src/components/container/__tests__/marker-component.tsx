import * as React from 'react'
import { shallow } from 'enzyme'
import { MarkerComponent, MarkerComponentProps, mapDispatchToProps } from '../marker-component'

describe('Marker Component', () => {
  it('Should match snapshot', () => {
    const props: MarkerComponentProps = {
      handleOnClick: jest.fn(),
      coordinate: {
        lng: 1,
        lat: 1,
        id: '1',
        address1: '1',
        address2: '1'
      }
    }
    const wrapper = shallow(<MarkerComponent {...props} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('mapDispatchToProps', () => {
    const mockDispatch = jest.fn()
    const mockOwnProps = {
      coordinate: {
        id: '1'
      }
    }
    const { handleOnClick } = mapDispatchToProps(mockDispatch, mockOwnProps)
    handleOnClick()
    expect(mockDispatch).toBeCalledWith({
      data: {
        id: '1'
      },
      type: 'APPOINTMENT_DETAIL_REQUEST_DATA'
    })
  })
})
