import React from 'react'
import { cx } from 'linaria'
export type ETAButtonProps = {
  tel: string | string[]
  body?: string
  children?: React.ReactNode
  className?: string
}

export const ETAButton: React.FC<ETAButtonProps> = ({ body, children, tel, className }) => {
  let href = `sms:${tel}`

  if (body) {
    href += `?&body=${body}`
  }

  return (
    <a href={href} className={cx('button', 'is-centered', 'is-info', className)} data-test="eta-button">
      {children}
    </a>
  )
}

export default React.memo(ETAButton)
