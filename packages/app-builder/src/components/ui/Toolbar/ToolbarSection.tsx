import { useNode } from '@craftjs/core'
import React from 'react'
import { css, cx } from '@linaria/core'
import { elFlex, elFlexJustifyBetween, elMt4, elMt2, elPx2 } from '@reapit/elements'

const pointer = css`
  cursor: pointer;
`

export const ToolbarSection = ({ title, props, summary, children }: any) => {
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
      <summary className={cx(elFlex, elFlexJustifyBetween, elPx2, elMt4, pointer)}>
        <span>{title}</span>
        <span>{summary && props && summary(nodeProps)}</span>
      </summary>
      <div className={cx(elMt2)}>{children}</div>
    </details>
  )
}
