import * as React from 'react'
import { shallow } from 'enzyme'
import ComingSoonApps, { onImageError, handleSetComingSoonAppSectionHeight } from '../coming-soon'

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

describe('handleSetComingSoonAppSectionHeight', () => {
  it('should run correctly', () => {
    const mockSetComingSoonAppSectionHeight = jest.fn()
    const mockContainerHeight = 1
    const fn = handleSetComingSoonAppSectionHeight(mockContainerHeight, mockSetComingSoonAppSectionHeight)
    fn()
    expect(mockSetComingSoonAppSectionHeight).toBeCalledWith(mockContainerHeight)
  })
})
