import { toId } from '@storybook/csf'
import React, { useState, useRef, useEffect } from 'react'
import { Canvas } from '@storybook/addon-docs'
import prettier from 'prettier/standalone'
import htmlParser from 'prettier/parser-html'

type RenderHtmlMarkupProps = {
  component: string
  story: string | string[]
  label?: string
}

const CanvasWithChildren = Canvas as any

export const RenderHtmlMarkup = ({ component, story, label }: RenderHtmlMarkupProps) => {
  const MAX_ATTEMPTS = 10
  const [domElements, setDomElements] = useState<(Element | null)[]>([])
  const [attempts, setAttempts] = useState<number>(0)

  // also use a ref so that inside the setTimeout callback, `attempts` is the
  // current value, not the value at time the setTimeout closure was invoked
  const attemptsRef = useRef(attempts)
  attemptsRef.current = attempts

  // turn the story prop into a stories array (even if only one story name is supplied)
  let stories: string[]
  if (typeof story === 'string') {
    stories = [story]
  } else {
    stories = story
  }

  const domIds = stories.map((story) => `story--${toId(component, story)}`)

  const findAndSetDoms = () => {
    const storyDoms = domIds.map((id) => document.querySelector(`#${id}`)).filter((item) => !!item)

    if (storyDoms && storyDoms.length === domIds.length) {
      setDomElements(storyDoms)
    } else {
      // attempt to find the element with the ID every 1.5seconds, up to 10
      // times (to wait enough time for the react render to have finished)
      if (attemptsRef.current < MAX_ATTEMPTS) {
        setAttempts(attemptsRef.current + 1)
        window.setTimeout(findAndSetDoms, 1500)
      }
    }
  }

  useEffect(() => {
    findAndSetDoms()
  }, [component, story])

  const getLabel = () => {
    if (!domElements) return `Cannot render HTML code for ${component}-${story}`
    if (label) return label
    return `HTML of ${stories.join(', ')}`
  }

  const getMdxSource = () => {
    if (!domElements) return ''
    if (domElements.length === 1)
      return prettier.format(domElements[0]?.innerHTML as string, {
        parser: 'html',
        plugins: [htmlParser],
      })

    if (domElements.length > 1) {
      const rawSource = domElements.reduce((acc, el) => `${acc}${el?.innerHTML}`, '')
      return prettier.format(rawSource, {
        parser: 'html',
        plugins: [htmlParser],
      })
    }
  }
  return (
    <CanvasWithChildren mdxSource={String(getMdxSource())}>
      <p>{getLabel()}</p>
    </CanvasWithChildren>
  )
}
