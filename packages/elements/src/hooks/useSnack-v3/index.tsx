import { useState } from 'react'
import usePortal from '../usePortal-v3'

function useSnack(id: string): HTMLDivElement {
  const portal = usePortal<HTMLDivElement>(id)

  useEffect(
    function setupElement() {
      // Look for existing target dom element to append to
      const existingParent = document.querySelector(`#${id}`) as HTMLDivElement
      // Parent is either a new root or the existing dom element
      const parentElem = existingParent || createRootElement(id)

      // If there is no existing DOM element, add a new one.
      if (!existingParent) {
        addRootElement(parentElem)
      }

      // Add the detached element to the parent
      if (rootElemRef.current) parentElem.appendChild(rootElemRef.current)

      return function removeElement() {
        if (rootElemRef.current) rootElemRef.current.remove()
        if (!parentElem.childElementCount) {
          parentElem.remove()
        }
      }
    },
    [id],
  )

  /**
   * It's important we evaluate this lazily:
   * - We need first render to contain the DOM element, so it shouldn't happen
   *   in useEffect. We would normally put this in the constructor().
   * - We can't do 'const rootElemRef = useRef(document.createElement('div))',
   *   since this will run every single render (that's a lot).
   * - We want the ref to consistently point to the same DOM element and only
   *   ever run once.
   * @link https://reactjs.org/docs/hooks-faq.html#how-to-create-expensive-objects-lazily
   */
  function getRootElem() {
    if (!rootElemRef.current) {
      rootElemRef.current = document.createElement('div')
    }
    return rootElemRef.current
  }

  return getRootElem()
}

export default usePortal
