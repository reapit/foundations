import * as React from 'react'
import { generateNumbers } from './utils'

export const caculateCircleRef = ({
  activeRef,
  circleRef
}: {
  activeRef: React.RefObject<HTMLLIElement>
  circleRef: React.RefObject<HTMLDivElement>
}) => {
  if (circleRef.current && activeRef.current) {
    const widthActiveItem = parseInt(window.getComputedStyle(activeRef.current, ':before').width, 10)
    const widthCircleWrapper = circleRef.current.offsetWidth
    // calculate the gap between outer for '.circle-active' element and inner for li elements
    const gap = (widthCircleWrapper - widthActiveItem) / 2
    // ensure the actived element will be rounded by wrapper with margin
    return activeRef.current.offsetLeft - gap
  }
}

export const caculateLineRef = ({ activeRef }: { activeRef: React.RefObject<HTMLLIElement> }) => {
  // calculate the height for '.line-active'
  if (activeRef.current) {
    const widthActiveItem = parseInt(window.getComputedStyle(activeRef.current, ':before').width, 10)
    const marginBetween = parseInt(window.getComputedStyle(activeRef.current, ':before').marginRight, 10)
    return activeRef.current.nextElementSibling
      ? activeRef.current.offsetLeft + widthActiveItem + marginBetween / 2
      : activeRef.current.offsetLeft + widthActiveItem
  }
}

// Calculate style '.circle-active' and '.line-active' elements when current active change
export const calculateElement = ({
  circleRef,
  activeRef,
  lineRef
}: {
  activeRef: React.RefObject<HTMLLIElement>
  circleRef: React.RefObject<HTMLDivElement>
  lineRef: React.RefObject<HTMLDivElement>
}) => () => {
  if (circleRef.current && activeRef.current && lineRef.current) {
    const circlePosX = caculateCircleRef({ activeRef, circleRef })
    circleRef.current.style.transform = `translateX(${circlePosX}px)`

    const lineWidth = caculateLineRef({ activeRef })
    lineRef.current.style.width = `${lineWidth}px`
  }
}

export const HorizontalTimeline = ({ total, currentIndex }) => {
  const circleRef = React.useRef<HTMLDivElement>(null)
  const lineRef = React.useRef<HTMLDivElement>(null)
  const activeRef = React.useRef<HTMLLIElement>(null)

  const numbers = React.useMemo(generateNumbers(total), [total])

  React.useEffect(calculateElement({ circleRef, lineRef, activeRef }), [currentIndex])

  return (
    <ul className="horizontal-timeline">
      <div ref={circleRef} className="circle-active"></div>
      <div ref={lineRef} className="line-active"></div>
      {numbers.map(item => (
        <li
          key={item}
          ref={currentIndex === item ? activeRef : null}
          className={`${currentIndex === item ? 'active' : ''} ${currentIndex > item ? 'passed' : ''}`}
        ></li>
      ))}
    </ul>
  )
}
