import React from 'react'
import { isMacLike } from '@/utils/device-detection'
import styles from '@/styles/ui/eta-button.scss?mod'

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
    <a href={href} className={`${styles.btnEta} button is-fullwidth is-centered is-primary`} data-test="eta-button">
      {children}
    </a>
  )
}

export default ETAButton
