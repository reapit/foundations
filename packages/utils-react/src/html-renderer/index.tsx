import * as React from 'react'
import { parse } from 'himalaya'
import renderer from './utils'
import { HtmlContentWrap } from './__styles__'

export interface HTMLRenderProps {
  html: string
  diffing?: boolean
  className?: string
  image?: React.ReactNode
}

export const HTMLRender: React.FC<HTMLRenderProps> = ({
  html,
  diffing = false,
  className = 'html-render',
  image,
}: HTMLRenderProps) => {
  const jsonElements = parse(html)
  return (
    <div className={className}>
      {image && image}
      <HtmlContentWrap>{renderer(jsonElements, diffing)}</HtmlContentWrap>
    </div>
  )
}
