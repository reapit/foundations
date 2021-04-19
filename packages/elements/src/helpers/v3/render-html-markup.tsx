import { toId } from '@storybook/csf'
import React, { useState, useRef, useEffect } from 'react'
import { Canvas } from '@storybook/addon-docs/blocks'

type RenderHtmlMarkupProps = {
  component: string
  story: string
}

const storyBlockIdFromId = (storyId: string) => `story--${storyId}`

export const RenderHtmlMarkup = ({ component, story }: RenderHtmlMarkupProps) => {
  const [domElement, setDomElement] = useState<Element | null>()
  const MAX_ATTEMPTS = 10
  const [attempts, setAttempts] = useState<number>(0)

  // also use a ref so that inside the setTimeout callback, `attempts` is the
  // current value, not the value at time the setTimeout closure was invoked
  const attemptsRef = useRef(attempts)
  attemptsRef.current = attempts

  const domId = storyBlockIdFromId(toId(component, story))

  const findAndSetDom = () => {
    const storyDom = document.querySelector(`#${domId}`)

    if (storyDom) {
      setDomElement(storyDom)
    } else {
      // attempt to find the element with the ID every 1.5seconds, up to 10
      // times (to wait enough time for the react render to have finished)
      if (attemptsRef.current < MAX_ATTEMPTS) {
        setAttempts(attemptsRef.current + 1)
        window.setTimeout(findAndSetDom, 1500)
      }
    }
  }

  useEffect(() => {
    findAndSetDom()
  }, [component, story])

  if (domElement) {
    return (
      <Canvas mdxSource={domElement?.innerHTML}>
        <p>HTML of {story}</p>
      </Canvas>
    )
  } else {
    return (
      <p>
        Cannot render HTML code for {component}-{story}
      </p>
    )
  }
}
