import React, { LegacyRef, MutableRefObject, MouseEvent, RefObject } from 'react'
import { render } from '../../../tests/react-testing'
import { Carousel, getCarouselDimensions, handleScroll } from '..'
import scrollIntoView from 'scroll-into-view-if-needed'
import { trackEvent } from '../../../core/analytics'
import { TrackingEvent } from '../../../core/analytics-events'

jest.mock('../../../core/analytics')
jest.mock('scroll-into-view-if-needed', () => ({
  __esModule: true,
  default: jest.fn(),
}))

const items = [
  <div key={0}>Carousel Item 1</div>,
  <div key={1}>Carousel Item 2</div>,
  <div key={2}>Carousel Item 3</div>,
]

describe('Carousel', () => {
  it('should match a snapshot with options', () => {
    expect(render(<Carousel numberCols={1} items={items} />)).toMatchSnapshot()
  })
})

describe('getCarouselDimensions', () => {
  it('should return the correct dimensions', () => {
    const numberCols = 1
    const currentImage = 1
    const curried = getCarouselDimensions(numberCols, currentImage, items)

    const result = curried()

    expect(result).toEqual({
      nextImage: 2,
      prevImage: 0,
      shouldShowPrev: true,
      shouldShowNext: true,
      percentageWidth: '100.000',
    })
  })
})

describe('handleScroll', () => {
  it('should return the correct dimensions', () => {
    const itemOne = document.createElement('div')
    const itemTwo = document.createElement('div')
    const itemThree = document.createElement('div')
    document.body.appendChild(itemOne)
    document.body.appendChild(itemTwo)
    document.body.appendChild(itemThree)

    const imageRefs = {
      current: [
        {
          current: itemOne,
        },
        {
          current: itemTwo,
        },
        {
          current: itemThree,
        },
      ],
    } as unknown as MutableRefObject<LegacyRef<HTMLDivElement>[]>
    const nextImage = 2
    const setCurrentImage = jest.fn()
    const curried = handleScroll(imageRefs, nextImage, setCurrentImage)
    const event = {
      preventDefault: jest.fn(),
    } as unknown as MouseEvent<HTMLAnchorElement>

    curried(event)

    expect(event.preventDefault).toHaveBeenCalledTimes(1)
    expect(scrollIntoView).toHaveBeenCalledWith((imageRefs.current[nextImage] as RefObject<HTMLDivElement>).current, {
      scrollMode: 'if-needed',
      behavior: 'smooth',
    })
    expect(trackEvent).toHaveBeenCalledWith(TrackingEvent.ClickScrollImageCarousel, true)
    expect(setCurrentImage).toHaveBeenCalledWith(nextImage)
  })
})
