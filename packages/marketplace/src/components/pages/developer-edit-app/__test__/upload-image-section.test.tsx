import * as React from 'react'
import { shallow } from 'enzyme'
import UploadImageSection from '../upload-image-section'

describe('MarketplaceStatusSection', () => {
  it('should match a snapshot', () => {
    expect(shallow(<UploadImageSection />)).toMatchSnapshot()
  })
})
