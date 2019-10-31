import React from 'react'
import { isMacLike } from '@/utils/device-detection'

interface ETAButtonProps {
  tel: string | string[]
  body?: string
}

export const ETAButton: React.FC<ETAButtonProps> = ({ body, children, tel }) => {
  let href = `sms:${tel}`

  if (body && !isMacLike()) {
    href += `?body=${body}`
  }

  return (
    <a href={href} className="button is-centered is-info" data-test="eta-button">
      {children}
    </a>
  )
}

export default ETAButton
