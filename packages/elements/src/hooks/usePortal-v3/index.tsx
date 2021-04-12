import { useRef, useEffect } from 'react'

// Create DOM element to be used as React root.
function createRootElement(id: string): HTMLDivElement {
  const rootContainer = document.createElement('div')
  rootContainer.setAttribute('id', id)
  return rootContainer
}

// Appends element as last child of body.
function addRootElement(rootElem: HTMLDivElement) {
  document.body.appendChild(rootElem)
}

/**
 * Hook to create a React Portal.
 * Automatically handles creating and tearing-down the root elements (no SRR
 * makes this trivial), so there is no need to ensure the parent target already
 * exists.
 * @example
 * const target = usePortal(id, [id]);
 * return createPortal(children, target);
 * @param {String} id The id of the target container, e.g 'modal' or 'spotlight'
 * @returns {HTMLElement} The DOM node to use as the Portal target.
 */
function usePortal(id: string): HTMLDivElement {
  const rootElemRef = useRef<HTMLDivElement>()

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
