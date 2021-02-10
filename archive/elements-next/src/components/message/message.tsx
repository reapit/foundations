import React from 'react'
import { cx } from 'linaria'
import { elMessage } from './styles'
import { elBgPrimary, elBgInfo, elBgSuccess, elBgDanger } from '@/base/background-colors'

export interface MessageProps {
  /**
   * Message content
   */
  message: string
  /**
   * message variant
   */
  variant?: 'info' | 'primary' | 'danger' | 'success'
  /**
   * Optional class to override any defaults
   */
  className?: string
}

export const Message: React.FC<MessageProps> = ({ message, variant = 'primary', className }) => {
  return (
    <article
      className={cx(
        elMessage,
        variant === 'primary' && elBgPrimary,
        variant === 'info' && elBgInfo,
        variant === 'success' && elBgSuccess,
        variant === 'danger' && elBgDanger,
        className,
      )}
    >
      {message}
    </article>
  )
}

export default Message
