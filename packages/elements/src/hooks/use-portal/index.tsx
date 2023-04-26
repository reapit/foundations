import { useRef, useEffect, ReactPortal } from 'react'
import { createPortal } from 'react-dom'

export const usePortal = (id: string) => {
  const rootElemRef = useRef(document.createElement('div'))

  useEffect(() => {
    const parentElem = document.querySelector(`#${id}`)

    if (parentElem) {
      parentElem.appendChild(rootElemRef.current)
    }

    return () => rootElemRef.current.remove()
  }, [id])

  return rootElemRef.current
}

export const Portal = ({ id, children }): ReactPortal => {
  const target = usePortal(id)
  return createPortal(children, target) as ReactPortal
}
