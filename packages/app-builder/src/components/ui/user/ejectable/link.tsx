import React, { forwardRef, Ref } from 'react'
import { Link as RRLink } from 'react-router-dom'
import { ContainerProps } from './container'
import { usePageId } from '../../../hooks/use-page-id'

export interface LinkProps extends ContainerProps {
  destination?: string
  context?: { [key: string]: any }
  disabled?: boolean
  className?: string
  children?: React.ReactNode
  text?: string
}

export const Link = forwardRef<HTMLDivElement, LinkProps>(({ disabled, children, ...props }, ref) => {
  const dest = props.destination || ''
  const { context, generateLinkAttrs } = usePageId()
  const search = {
    ...context,
    ...props.context,
  }

  return (
    <RRLink
      to={generateLinkAttrs(dest, search)}
      onClick={(e) => {
        if (disabled) {
          e.preventDefault()
          return false
        }
      }}
      style={{
        display: 'block',
        padding: 12,
      }}
      ref={ref as Ref<HTMLAnchorElement>}
    >
      {props.text || children}
    </RRLink>
  )
})
