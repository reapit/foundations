import * as React from 'react'

export const LI_MARGIN = 30

export const generateNumbers = (total: number) => () => {
  return [...Array(total).keys()]
}

export const NumberedTimeline = ({ total, currentIndex }) => {
  const circleRef = React.useRef<HTMLDivElement>(null)
  const lineRef = React.useRef<HTMLDivElement>(null)
  const activeRef = React.useRef<HTMLLIElement>(null)

  const numbers = React.useMemo(generateNumbers(total), [total])

  // Calculate style '.circle-active' and '.line-active' elements when current active change
  React.useEffect(() => {
    if (circleRef.current && activeRef.current && lineRef.current) {
      // calculate the gap between outer for '.circle-active' element and inner for li elements
      // offsetHeight for li element include margin-top and margin-bottom so need minus first
      const gap = (circleRef.current.offsetHeight - (activeRef.current.offsetHeight - LI_MARGIN * 2)) / 2
      // ensure the actived element will be rounded by wrapper with margin
      const wrapperPosY = activeRef.current.offsetTop + LI_MARGIN - gap

      circleRef.current.style.transform = `translateY(${wrapperPosY}px)`

      // calculate the height for '.line-active'
      if (activeRef.current.nextElementSibling) {
        const lineHeight = activeRef.current.offsetTop + LI_MARGIN * 2
        lineRef.current.style.height = `${lineHeight}px`
      } else {
        const lineHeight = activeRef.current.offsetTop + LI_MARGIN
        lineRef.current.style.height = `${lineHeight}px`
      }
    }
  }, [currentIndex])

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
