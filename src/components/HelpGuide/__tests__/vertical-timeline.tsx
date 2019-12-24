import * as React from 'react'
import { shallow } from 'enzyme'
import {
  VerticalTimeline,
  generateNumbers,
  caculateCircleRef,
  caculateLineRef,
  calculateElement,
  LI_MARGIN
} from '../vertical-timeline'

describe('NumberedTimeline', () => {
  it('should match a snapshot', () => {
    expect(shallow(<VerticalTimeline total={5} currentIndex={3} />)).toMatchSnapshot()
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
      } as React.RefObject<HTMLLIElement>,
      circleRef: {
        current: {
          offsetHeight: 15
        }
      } as React.RefObject<HTMLDivElement>
    }

    const { activeRef, circleRef } = mockProps

    if (activeRef.current && circleRef.current) {
      const gap = (circleRef.current.offsetHeight - (activeRef.current.offsetHeight - LI_MARGIN * 2)) / 2
      expect(caculateCircleRef(mockProps)).toEqual(activeRef.current.offsetTop + LI_MARGIN - gap)
    }
  })

  it('caculateLineRef should run correctly when nextElementSibling null', () => {
    const mockProps = {
      activeRef: {
        current: {
          nextElementSibling: null,
          offsetTop: 20
        }
      } as React.RefObject<HTMLLIElement>
    }

    const { activeRef } = mockProps

    if (activeRef.current) {
      expect(caculateLineRef(mockProps)).toEqual(activeRef.current.offsetTop + LI_MARGIN)
    }
  })

  it('caculateLineRef should run correctly when have nextElementSibling', () => {
    const mockProps = {
      activeRef: {
        current: {
          nextElementSibling: <li>Test</li> as any,
          offsetTop: 20
        }
      } as React.RefObject<HTMLLIElement>
    }

    const { activeRef } = mockProps

    if (activeRef.current) {
      expect(caculateLineRef(mockProps)).toEqual(activeRef.current.offsetTop + LI_MARGIN * 2)
    }
  })

  it('calculateElement should run correctly', () => {
    const mockProps = {
      activeRef: {
        current: {
          offsetHeight: 10,
          offsetTop: 20
        }
      } as React.RefObject<HTMLLIElement>,
      circleRef: {
        current: {
          offsetHeight: 15,
          style: {
            transform: ''
          }
        }
      } as React.RefObject<HTMLDivElement>,
      lineRef: {
        current: {
          style: {
            height: ''
          }
        }
      } as React.RefObject<HTMLDivElement>
    }

    const { activeRef, circleRef, lineRef } = mockProps

    calculateElement(mockProps)()
    const circlePosY = caculateCircleRef({ activeRef, circleRef })
    const lineHeight = caculateLineRef({ activeRef })

    if (activeRef.current && circleRef.current && lineRef.current) {
      circleRef.current.style.transform = `translateY(${circlePosY}px)`
      lineRef.current.style.height = `${lineHeight}px`

      expect(circleRef.current.style.transform).toEqual(`translateY(${circlePosY}px)`)
      expect(lineRef.current.style.height).toEqual(`${lineHeight}px`)
    }
  })
})
