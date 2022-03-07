import * as React from 'react'
import { shallow } from 'enzyme'
import { ImageCropperFileInput } from '../image-cropper'

describe('ImageCropperWithInput', () => {
  it('should match snapshots with multiple conditions', () => {
    const props1 = {
      aspect: 16 / 9,
      name: 'inputImage',
      labelText: 'input image',
    }
    const wrapper1 = shallow(<ImageCropperFileInput {...props1} />)
    expect(wrapper1).toMatchSnapshot()

    const props2 = {
      ...props1,
      aspect: undefined,
    }
    const wrapper2 = shallow(<ImageCropperFileInput {...props2} />)
    expect(wrapper2).toMatchSnapshot()
  })
})
