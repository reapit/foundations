import * as React from 'react'
import { HTMLRender } from '@reapit/elements'
import { cx } from '@linaria/core'
import { diffHtmlContainer, diffRenderBlock, redBackground, greenBackground, arrow } from './__styles__'

export interface DiffRenderHTMLProps {
  currentString?: string
  changedString?: string
}

export const DiffRenderHTML = ({ currentString, changedString }: DiffRenderHTMLProps) => {
  const isDiff = currentString !== changedString
  return (
    <div className={diffHtmlContainer}>
      <HTMLRender className={cx(diffRenderBlock, isDiff && redBackground)} html={currentString || ''} />
      <span className={arrow}>&#8594;</span>
      <HTMLRender className={cx(diffRenderBlock, isDiff && greenBackground)} html={changedString || ''} />
    </div>
  )
}

export default DiffRenderHTML
