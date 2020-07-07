import * as React from 'react'
import { shallow } from 'enzyme'
import UploadImageSection from '../upload-image-section'

describe('MarketplaceStatusSection', () => {
  it('should match a snapshot when isListed equal to true', () => {
    expect(shallow(<UploadImageSection isListed={true} />)).toMatchSnapshot()
  })
  it('should match a snapshot when isListed equal to false', () => {
    expect(shallow(<UploadImageSection isListed={false} />)).toMatchSnapshot()
  })
})
