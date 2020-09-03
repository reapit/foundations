import * as React from 'react'
import { cx } from 'linaria'
import { HTMLRender } from '@reapit/elements'
import { red, green, diffRenderBlock, arrow, diffRenderHtmlContainer } from './__styles__/pending-revision-comparison'

export interface DiffRenderHTMLProps {
  currentString?: string
  changedString?: string
}

const DiffRenderHTML = ({ currentString, changedString }: DiffRenderHTMLProps) => {
  const isDiff = currentString !== changedString
  return (
    <div className={diffRenderHtmlContainer}>
      <HTMLRender className={cx(diffRenderBlock, isDiff && red)} html={currentString || ''} />
      <span className={arrow}>&#8594;</span>
      <HTMLRender className={cx(diffRenderBlock, isDiff && green)} html={changedString || ''} />
    </div>
  )
}

export default DiffRenderHTML
