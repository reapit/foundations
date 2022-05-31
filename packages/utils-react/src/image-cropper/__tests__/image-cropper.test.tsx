import * as React from 'react'
import { render } from '@testing-library/react'
import { ImageCropperFileInput } from '../image-cropper'

describe('ImageCropperWithInput', () => {
  it('should match snapshots with multiple conditions', () => {
    const props1 = {
      aspect: 16 / 9,
      name: 'inputImage',
      labelText: 'input image',
    }
    const wrapper1 = render(<ImageCropperFileInput {...props1} />)
    expect(wrapper1).toMatchSnapshot()

    const props2 = {
      ...props1,
      aspect: undefined,
    }
    const wrapper2 = render(<ImageCropperFileInput {...props2} />)
    expect(wrapper2).toMatchSnapshot()
  })
})
