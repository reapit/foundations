import * as React from 'react'
import { shallow } from 'enzyme'
import ComingSoonApps, { onImageError } from '../coming-soon'

jest.mock('@/assets/images/default-feature-image.jpg', () => 'placeHolderImage')

describe('ComingSoonApps', () => {
  it('should match a snapshot', () => {
    expect(shallow(<ComingSoonApps />)).toMatchSnapshot()
  })
})

describe('onImageError', () => {
  it('should set src correctly', () => {
    const eventMock = {
      currentTarget: {
        src: 'src1',
      },
    } as any
    onImageError(eventMock)
    const srcNew = eventMock.currentTarget.src
    expect(srcNew).toBe('placeHolderImage')
  })
})
