/* istanbul ignore file */
/* Had to add because of skipped test, react hooks testing not yet supporting React 18 
https://github.com/testing-library/react-hooks-testing-library/issues/654 can remove when tests un-skipped
Looks like we will have to migrate to the main testing lib when this PR is merged
https://github.com/testing-library/react-testing-library/pull/991*/
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
  return createPortal(children, target)
}
