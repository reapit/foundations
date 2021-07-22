import { useNode } from '@craftjs/core'
import React from 'react'
import { css } from '@linaria/core'

const summaryClass = css`
  display: flex;
  justify-content: space-between;
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
      <summary className={summaryClass}>
        {title} {summary && props && summary(nodeProps)}
      </summary>
      {children}
    </details>
  )
}
