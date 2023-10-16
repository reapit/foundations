import React, { FC, HTMLAttributes } from 'react'
import { cx } from '@linaria/core'
import { ElAvatar, ElAvatarImage } from './__styles__'

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  type?: 'profile' | 'image'
  src?: string
}

export const Avatar: FC<AvatarProps> = ({ children, src, type, className, ...rest }) => {
  return type === 'image' ? (
    <ElAvatarImage className={cx(className)} {...rest}>
      {src ? <img src={src} alt={src} /> : children}
    </ElAvatarImage>
  ) : (
    <ElAvatar className={cx(className)} {...rest}>
      {src ? <img src={src} /> : children}
    </ElAvatar>
  )
}
