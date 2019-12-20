import * as React from 'react'

export const LI_MARGIN = 30

export const generateNumbers = (total: number) => () => {
  return [...Array(total).keys()]
}

export const caculateCircleRef = ({ activeRef, circleRef }) => {
  if (circleRef.current && activeRef.current) {
    // calculate the gap between outer for '.circle-active' element and inner for li elements
    // offsetHeight for li element include margin-top and margin-bottom so need minus first
    const gap = (circleRef.current.offsetHeight - (activeRef.current.offsetHeight - LI_MARGIN * 2)) / 2
    // ensure the actived element will be rounded by wrapper with margin
    return activeRef.current.offsetTop + LI_MARGIN - gap
  }
}

export const caculateLineRef = ({ activeRef }) => {
  // calculate the height for '.line-active'
  if (activeRef.current && activeRef.current.nextElementSibling) {
    return activeRef.current.offsetTop + LI_MARGIN * 2
  } else {
    return activeRef.current.offsetTop + LI_MARGIN
    // lineRef.current.style.height = `${lineHeight}px`
  }
}

// Calculate style '.circle-active' and '.line-active' elements when current active change
export const calculateElement = ({ circleRef, activeRef, lineRef }) => () => {
  if (circleRef.current && activeRef.current && lineRef.current) {
    const circlePosY = caculateCircleRef({ activeRef, circleRef })
    circleRef.current.style.transform = `translateY(${circlePosY}px)`

    const lineHeight = caculateLineRef({ activeRef })
    lineRef.current.style.height = `${lineHeight}px`
  }
}

export const NumberedTimeline = ({ total, currentIndex }) => {
  const circleRef = React.useRef<HTMLDivElement>(null)
  const lineRef = React.useRef<HTMLDivElement>(null)
  const activeRef = React.useRef<HTMLLIElement>(null)

  const numbers = React.useMemo(generateNumbers(total), [total])

  React.useEffect(calculateElement({ circleRef, lineRef, activeRef }), [currentIndex])

  return (
    <ul className="numbers-timeline">
      <div ref={circleRef} className="circle-active"></div>
      <div ref={lineRef} className="line-active"></div>
      {numbers.map(item => (
        <li
          ref={currentIndex === item ? activeRef : null}
          key={item}
          className={`${currentIndex === item ? 'active' : ''} ${currentIndex > item ? 'passed' : ''}`}
        ></li>
      ))}
    </ul>
  )
}
