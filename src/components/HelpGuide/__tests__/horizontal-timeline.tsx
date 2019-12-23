import * as React from 'react'
import { shallow } from 'enzyme'
import {
  HorizontalTimeline,
  generateNumbers,
  caculateCircleRef,
  caculateLineRef,
  calculateElement
} from '../horizontal-timeline'

describe('NumberedTimeline', () => {
  it('should match a snapshot', () => {
    expect(shallow(<HorizontalTimeline total={5} currentIndex={3} />)).toMatchSnapshot()
  })

  it('generateNumbers should run correctly', () => {
    ;[[5, [0, 1, 2, 3, 4]], [3, [0, 1, 2]]].forEach(([input, expected]) => {
      expect(generateNumbers(input as number)()).toEqual(expected)
    })
  })

  it('caculateCircleRef should run correctly', () => {
    const mockProps = {
      activeRef: {
        current: {
          offsetLeft: 40
        }
      } as React.MutableRefObject<HTMLElement>,
      circleRef: {
        current: {
          offsetWidth: 15
        }
      }
    }

    const widthActiveItem = parseInt(window.getComputedStyle(mockProps.activeRef.current, ':before').width, 10)
    const widthCircleWrapper = mockProps.circleRef.current.offsetWidth
    const gap = (widthCircleWrapper - widthActiveItem) / 2

    expect(caculateCircleRef(mockProps)).toEqual(mockProps.activeRef.current.offsetLeft - gap)
  })

  it('caculateLineRef should run correctly when nextElementSibling null', () => {
    const mockProps = {
      activeRef: {
        current: {
          nextElementSibling: null,
          offsetTop: 20
        }
      } as React.MutableRefObject<HTMLElement>
    }

    const widthActiveItem = parseInt(window.getComputedStyle(mockProps.activeRef.current, ':before').width, 10)

    expect(caculateLineRef(mockProps)).toEqual(mockProps.activeRef.current.offsetLeft + widthActiveItem)
  })

  it('caculateLineRef should run correctly when have nextElementSibling', () => {
    const mockProps = {
      activeRef: {
        current: {
          nextElementSibling: <li>Test</li> as any,
          offsetTop: 20
        }
      } as React.MutableRefObject<HTMLElement>
    }

    const widthActiveItem = parseInt(window.getComputedStyle(mockProps.activeRef.current, ':before').width, 10)
    const marginBetween = parseInt(window.getComputedStyle(mockProps.activeRef.current, ':before').marginRight, 10)

    expect(caculateLineRef(mockProps)).toEqual(
      mockProps.activeRef.current.offsetLeft + widthActiveItem + marginBetween / 2
    )
  })

  it('calculateElement should run correctly', () => {
    const mockProps = {
      activeRef: {
        current: {
          offsetHeight: 10,
          offsetTop: 20
        }
      },
      circleRef: {
        current: {
          offsetHeight: 15,
          style: {
            transform: ''
          }
        }
      },
      lineRef: {
        current: {
          style: {
            height: ''
          }
        }
      }
    }

    calculateElement(mockProps)()

    const circlePosX = caculateCircleRef(mockProps)
    mockProps.circleRef.current.style.transform = `translateX(${circlePosX}px)`
    expect(mockProps.circleRef.current.style.transform).toEqual(`translateX(${circlePosX}px)`)
  })
})
