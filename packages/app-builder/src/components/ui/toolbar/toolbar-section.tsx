import { useNode } from '@craftjs/core'
import React, { FC } from 'react'
import { cx } from '@linaria/core'
import { elFlex, elFlexJustifyBetween, elMt6, elMt3, elPx3 } from '@reapit/elements'
import { cursorPointer } from '../styles'

interface ToolbarSectionProps {
  children: React.ReactNode
  title: string
  summary: (nodeProps: any) => React.ReactNode
  props: any
}

export const ToolbarSection: FC<ToolbarSectionProps> = ({ title, props, summary, children }: ToolbarSectionProps) => {
  const { nodeProps } = useNode((node) => ({
    nodeProps:
      props &&
      props.reduce((res: any, key: any) => {
        res[key] = node.data.props[key] || null
        return res
      }, {}),
  }))

  return (
    <details>
      <summary className={cx(elFlex, elFlexJustifyBetween, elPx3, elMt6, cursorPointer)}>
        <span>{title}</span>
        {summary && props && <span>{summary(nodeProps)}</span>}
      </summary>
      <div className={cx(elMt3)}>{children}</div>
    </details>
  )
}
