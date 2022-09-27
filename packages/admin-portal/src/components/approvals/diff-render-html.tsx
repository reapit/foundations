import React, { FC } from 'react'
import { cx } from '@linaria/core'
import { diffHtmlContainer, diffRenderBlock, redBackground, greenBackground, arrow } from './__styles__'
import { HTMLRender } from '@reapit/utils-react'

export interface DiffRenderHTMLProps {
  currentString?: string
  changedString?: string
}

export const DiffRenderHTML: FC<DiffRenderHTMLProps> = ({ currentString, changedString }) => {
  const isDiff = currentString !== changedString
  return (
    <div className={diffHtmlContainer}>
      <HTMLRender className={cx(diffRenderBlock, isDiff && redBackground)} html={currentString || ''} />
      <span className={arrow}>&#8594;</span>
      <HTMLRender className={cx(diffRenderBlock, isDiff && greenBackground)} html={changedString || ''} />
    </div>
  )
}
