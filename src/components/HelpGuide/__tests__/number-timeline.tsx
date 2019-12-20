import * as React from 'react'
import { shallow } from 'enzyme'
import {
  NumberedTimeline,
  generateNumbers,
  caculateCircleRef,
  caculateLineRef,
  calculateElement,
  LI_MARGIN
} from '../number-timeline'

describe('NumberedTimeline', () => {
  it('should match a snapshot', () => {
    expect(shallow(<NumberedTimeline total={5} currentIndex={3} />)).toMatchSnapshot()
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
          offsetHeight: 10,
          offsetTop: 20
        }
      },
      circleRef: {
        current: {
          offsetHeight: 15
        }
      }
    }

    const gap =
      (mockProps.circleRef.current.offsetHeight - (mockProps.activeRef.current.offsetHeight - LI_MARGIN * 2)) / 2

    expect(caculateCircleRef(mockProps)).toEqual(mockProps.activeRef.current.offsetTop + LI_MARGIN - gap)
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

    expect(caculateLineRef(mockProps)).toEqual(mockProps.activeRef.current.offsetTop + LI_MARGIN)
  })

  it('caculateLineRef should run correctly when have nextElementSibling', () => {
    const mockProps = {
      activeRef: {
        current: {
          nextElementSibling: <li>Test</li>,
          offsetTop: 20
        }
      }
    }

    expect(caculateLineRef(mockProps)).toEqual(mockProps.activeRef.current.offsetTop + LI_MARGIN * 2)
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

    const circlePosY = caculateCircleRef(mockProps)
    mockProps.circleRef.current.style.transform = `translateY(${circlePosY}px)`
    expect(mockProps.circleRef.current.style.transform).toEqual(`translateY(${circlePosY}px)`)
  })
})
