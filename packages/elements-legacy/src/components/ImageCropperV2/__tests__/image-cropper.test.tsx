import * as React from 'react'
import { render } from '../../../tests/react-testing'
import { ImageCropper, ImageCropperWithInput, renderChildrenWithProps } from '../'

describe('ImageCropper', () => {
  it('should match snapshots with multiple conditions', () => {
    const props1 = {
      upImg: '',
      setUpImg: jest.fn(),
      visible: true,
      setVisible: jest.fn(),
      croppedImage: '',
      setCroppedImage: jest.fn(),
      onClose: jest.fn(),
      onCropClick: jest.fn(),
      aspect: 16 / 9,
    }
    const wrapper1 = render(<ImageCropper {...props1} />)
    expect(wrapper1).toMatchSnapshot()

    const props2 = {
      ...props1,
      aspect: undefined,
      visible: false,
      children: <div>value</div>,
    }
    const wrapper2 = render(<ImageCropper {...props2} />)
    expect(wrapper2).toMatchSnapshot()
  })
})

describe('ImageCropperWithInput', () => {
  it('should match snapshots with multiple conditions', () => {
    const props1 = {
      aspect: 16 / 9,
      name: 'inputImage',
      labelText: 'input image',
    }
    const wrapper1 = render(<ImageCropperWithInput {...props1} />)
    expect(wrapper1).toMatchSnapshot()

    const props2 = {
      ...props1,
      aspect: undefined,
    }
    const wrapper2 = render(<ImageCropperWithInput {...props2} />)
    expect(wrapper2).toMatchSnapshot()
  })
})

describe('renderChildrenWithProps', () => {
  it('should match snapshots with multiple conditions', () => {
    const props1 = {
      children: [<div key={1}>1</div>, <div key={2}>2</div>],
      props: {
        value: 'value',
      },
    }
    const wrapper1 = render(<div>{renderChildrenWithProps(props1.children, props1.props)}</div>)
    expect(wrapper1).toMatchSnapshot()

    const props2 = {
      ...props1,
      children: undefined,
    }
    const wrapper2 = render(<div>{renderChildrenWithProps(props2.children, props2.props)}</div>)
    expect(wrapper2).toMatchSnapshot()
  })
})
