import React from 'react'
import { render } from '../../../tests/react-testing'
import { handleDocsMouseOver, handleNewMouseOver, WebhooksAbout } from '../webhooks-about'

describe('WebhooksAbout', () => {
  it('should match a snapshot', () => {
    expect(render(<WebhooksAbout />)).toMatchSnapshot()
  })
})

describe('handleNewMouseOver', () => {
  it('should set the animated state', () => {
    const setNewIsAnimated = jest.fn()
    const isAnimated = true
    const curried = handleNewMouseOver(setNewIsAnimated, isAnimated)

    curried()

    expect(setNewIsAnimated).toHaveBeenCalledWith(isAnimated)
  })
})

describe('handleDocsMouseOver', () => {
  it('should set the animated state', () => {
    const setDocsIsAnimated = jest.fn()
    const isAnimated = true
    const curried = handleDocsMouseOver(setDocsIsAnimated, isAnimated)

    curried()

    expect(setDocsIsAnimated).toHaveBeenCalledWith(isAnimated)
  })
})
