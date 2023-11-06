import React, { FC, HTMLAttributes, ReactNode } from 'react'
import { cx } from '@linaria/core'
import {
  ElDrawerBg,
  ElDrawer,
  ElDrawerHeader,
  ElDrawerBody,
  ElDrawerTitle,
  ElDrawerFooter,
  ElDrawerSubtitle,
} from './__styles__'
import { elIsActive } from '../../styles/states'
import { Icon } from '../icon'

export interface DrawerProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean
  onDrawerClose: () => void
  title?: string
  subtitle?: string
  className?: string
  footerItems?: ReactNode
  canDismiss?: boolean
}

export interface DrawerBaseProps extends HTMLAttributes<HTMLElement> {}

export const DrawerBg: FC<DrawerBaseProps> = ({ className, children, ...rest }: DrawerBaseProps) => (
  <ElDrawerBg className={cx(className)} {...rest}>
    {children}
  </ElDrawerBg>
)

export const DrawerContainer: FC<DrawerBaseProps> = ({ className, children, ...rest }: DrawerBaseProps) => (
  <ElDrawer className={cx(className)} {...rest}>
    {children}
  </ElDrawer>
)

export const DrawerHeader: FC<DrawerBaseProps> = ({ className, children, ...rest }: DrawerBaseProps) => (
  <ElDrawerHeader className={cx(className)} {...rest}>
    {children}
  </ElDrawerHeader>
)

export const DrawerTitle: FC<DrawerBaseProps> = ({ className, children, ...rest }: DrawerBaseProps) => (
  <ElDrawerTitle className={cx(className)} {...rest}>
    {children}
  </ElDrawerTitle>
)

export const DrawerSubtitle: FC<DrawerBaseProps> = ({ className, children, ...rest }: DrawerBaseProps) => (
  <ElDrawerSubtitle className={cx(className)} {...rest}>
    {children}
  </ElDrawerSubtitle>
)

export const DrawerBody: FC<DrawerBaseProps> = ({ className, children, ...rest }: DrawerBaseProps) => (
  <ElDrawerBody className={cx(className)} {...rest}>
    {children}
  </ElDrawerBody>
)

export const DrawerFooter: FC<DrawerBaseProps> = ({ className, children, ...rest }: DrawerBaseProps) => (
  <ElDrawerFooter className={cx(className)} {...rest}>
    {children}
  </ElDrawerFooter>
)

export const Drawer: FC<DrawerProps> = ({
  isOpen,
  onDrawerClose,
  title,
  subtitle,
  footerItems,
  className,
  children,
  canDismiss,
  ...rest
}) => {
  const drawerCombinedClassname = cx(className, elIsActive)

  if (!isOpen) return null

  return (
    <>
      <ElDrawerBg className={elIsActive} onClick={canDismiss ? onDrawerClose : undefined} />
      <ElDrawer className={drawerCombinedClassname} {...rest}>
        <ElDrawerHeader>
          <div>
            {title && <ElDrawerTitle>{title}</ElDrawerTitle>}
            {subtitle && <ElDrawerSubtitle>{subtitle}</ElDrawerSubtitle>}
          </div>
          {canDismiss && <Icon icon="close" intent="default" onClick={onDrawerClose} />}
        </ElDrawerHeader>
        <ElDrawerBody>{children}</ElDrawerBody>
        {footerItems && <ElDrawerFooter>{footerItems}</ElDrawerFooter>}
      </ElDrawer>
    </>
  )
}
