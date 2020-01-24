import * as React from 'react'
import { generateNumbers } from './utils'

export const LI_MARGIN = 30

export const caculateCircleRef = ({
  activeRef,
  circleRef,
}: {
  activeRef: React.RefObject<HTMLLIElement>
  circleRef: React.RefObject<HTMLDivElement>
}) => {
  if (circleRef.current && activeRef.current) {
    // calculate the gap between outer for '.circle-active' element and inner for li elements
    // offsetHeight for li element include margin-top and margin-bottom so need minus first
    const offset = activeRef.current.offsetHeight - LI_MARGIN
    const offsetDoubled = offset * 2
    const gap = (circleRef.current.offsetHeight - offsetDoubled) / 2
    // ensure the actived element will be rounded by wrapper with margin
    return activeRef.current.offsetTop + LI_MARGIN - gap
  }
}

export const caculateLineRef = ({ activeRef }: { activeRef: React.RefObject<HTMLLIElement> }) => {
  // calculate the height for '.line-active'
  if (activeRef.current) {
    const nextSibling = activeRef.current.offsetTop + LI_MARGIN
    return activeRef.current.nextElementSibling ? nextSibling * 2 : activeRef.current.offsetTop + LI_MARGIN
  }
}

// Calculate style '.circle-active' and '.line-active' elements when current active change
export const calculateElement = ({
  circleRef,
  activeRef,
  lineRef,
}: {
  activeRef: React.RefObject<HTMLLIElement>
  circleRef: React.RefObject<HTMLDivElement>
  lineRef: React.RefObject<HTMLDivElement>
}) => () => {
  if (circleRef.current && activeRef.current && lineRef.current) {
    const circlePosY = caculateCircleRef({ activeRef, circleRef })
    circleRef.current.style.transform = `translateY(${circlePosY}px)`

    const lineHeight = caculateLineRef({ activeRef })
    lineRef.current.style.height = `${lineHeight}px`
  }
}

export const VerticalTimeline = ({ total, currentIndex, onSelect }) => {
  const circleRef = React.useRef<HTMLDivElement>(null)
  const lineRef = React.useRef<HTMLDivElement>(null)
  const activeRef = React.useRef<HTMLLIElement>(null)
  const numbers = React.useMemo(generateNumbers(total), [total])

  React.useEffect(calculateElement({ circleRef, lineRef, activeRef }), [currentIndex])

  return (
    <ul className="vertical-timeline">
      <div ref={circleRef} className="circle-active"></div>
      <div ref={lineRef} className="line-active"></div>
      {numbers.map(item => (
        <li
          ref={currentIndex === item ? activeRef : null}
          key={item}
          onClick={() => onSelect(item)}
          className={`${currentIndex === item ? 'active' : ''} ${currentIndex > item ? 'passed' : ''}`}
        ></li>
      ))}
    </ul>
  )
}
