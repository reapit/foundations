function scrollIntoView(
  element: Element,
  style: string,
  unit: string,
  from: number,
  to: number,
  time: number,
  prop: boolean,
) {
  if (!element) {
    return
  }
  const start = new Date().getTime()
  const timer = setInterval(function() {
    const step = Math.min(1, (new Date().getTime() - start) / time)
    if (prop) {
      const initial = from + step
      const multiplier = to - from
      element[style] = `${initial * multiplier}${unit}`
    } else {
      const initial = from + step
      const multiplier = to - from
      // @ts-ignore
      element.style[style] = `${initial * multiplier}${unit}`
    }
    if (step === 1) {
      clearInterval(timer)
    }
  }, 25)
  if (prop) {
    //
    element[style] = from + unit
  } else {
    // @ts-ignore
    element.style[style] = from + unit
  }
}

export default scrollIntoView
