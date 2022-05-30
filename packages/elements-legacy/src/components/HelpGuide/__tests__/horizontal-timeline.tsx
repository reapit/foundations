import * as React from 'react'
import { render } from '../../../tests/react-testing'
import { HorizontalTimeline, caculateCircleRef, caculateLineRef, calculateElement } from '../horizontal-timeline'

describe('NumberedTimeline', () => {
  it('should match a snapshot', () => {
    const mockProps = {
      total: 5,
      currentIndex: 3,
      onSelect: jest.fn(),
    }
    expect(render(<HorizontalTimeline {...mockProps} />)).toMatchSnapshot()
  })

  it('caculateCircleRef should run correctly', () => {
    const mockProps = {
      activeRef: {
        current: {
          offsetLeft: 40,
        },
      } as React.RefObject<HTMLLIElement>,
      circleRef: {
        current: {
          offsetWidth: 15,
        },
      } as React.RefObject<HTMLDivElement>,
    }

    const { activeRef, circleRef } = mockProps
    if (activeRef.current && circleRef.current) {
      const widthActiveItem = parseInt(window.getComputedStyle(activeRef.current, ':before').width, 10)
      const widthCircleWrapper = circleRef.current.offsetWidth
      const gap = (widthCircleWrapper - widthActiveItem) / 2

      expect(caculateCircleRef(mockProps)).toEqual(activeRef.current.offsetLeft - gap)
    }
  })

  it('caculateLineRef should run correctly when nextElementSibling null', () => {
    const mockProps = {
      activeRef: {
        current: {
          nextElementSibling: null,
          offsetTop: 20,
        },
      } as React.RefObject<HTMLLIElement>,
    }

    const { activeRef } = mockProps

    if (activeRef.current) {
      const widthActiveItem = parseInt(window.getComputedStyle(activeRef.current, ':before').width, 10)
      expect(caculateLineRef(mockProps)).toEqual(activeRef.current.offsetLeft + widthActiveItem)
    }
  })

  it('caculateLineRef should run correctly when have nextElementSibling', () => {
    const mockProps = {
      activeRef: {
        current: {
          nextElementSibling: (<li>Test</li>) as any,
          offsetTop: 20,
        },
      } as React.RefObject<HTMLLIElement>,
    }

    const { activeRef } = mockProps

    if (activeRef.current) {
      const widthActiveItem = parseInt(window.getComputedStyle(activeRef.current, ':before').width, 10)
      const marginBetween = parseInt(window.getComputedStyle(activeRef.current, ':before').marginRight, 10)
      const offset = activeRef.current.offsetLeft + widthActiveItem
      expect(caculateLineRef(mockProps)).toEqual(marginBetween / 2 + offset)
    }
  })

  it('calculateElement should run correctly', () => {
    const mockProps = {
      activeRef: {
        current: {
          offsetLeft: 10,
          offsetWidth: 20,
        },
      } as React.RefObject<HTMLLIElement>,
      circleRef: {
        current: {
          offsetWidth: 15,
          style: {
            transform: '',
          },
        },
      } as React.RefObject<HTMLDivElement>,
      lineRef: {
        current: {
          style: {
            height: '',
          },
        },
      } as React.RefObject<HTMLDivElement>,
    }

    const { activeRef, circleRef, lineRef } = mockProps

    calculateElement(mockProps)()
    const circlePosX = caculateCircleRef({ activeRef, circleRef })
    const lineWidth = caculateLineRef({ activeRef })

    if (activeRef.current && circleRef.current && lineRef.current) {
      circleRef.current.style.transform = `translateX(${circlePosX}px)`
      lineRef.current.style.width = `${lineWidth}px`

      expect(circleRef.current.style.transform).toEqual(`translateX(${circlePosX}px)`)
      expect(lineRef.current.style.width).toEqual(`${lineWidth}px`)
    }
  })
})
