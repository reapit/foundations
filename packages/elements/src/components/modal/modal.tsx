import React, { FC, HTMLAttributes } from 'react'
import { cx } from '@linaria/core'
import { ElModalBg, ElModal, ElModalHeader, ElModalBody } from './__styles__'
import { elIsActive } from '../../styles/states'

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean
  onModalClose: () => void
  title?: string
  className?: string
}

export interface ModalBaseProps extends HTMLAttributes<HTMLElement> {}

export const ModalBg: FC<ModalBaseProps> = ({ className, children, ...rest }: ModalBaseProps) => (
  <ElModalBg className={cx(className && className)} {...rest}>
    {children}
  </ElModalBg>
)

export const ModalContainer: FC<ModalBaseProps> = ({ className, children, ...rest }: ModalBaseProps) => (
  <ElModal className={cx(className && className)} {...rest}>
    {children}
  </ElModal>
)

export const ModalHeader: FC<ModalBaseProps> = ({ className, children, ...rest }: ModalBaseProps) => (
  <ElModalHeader className={cx(className && className)} {...rest}>
    {children}
  </ElModalHeader>
)

export const ModalBody: FC<ModalBaseProps> = ({ className, children, ...rest }: ModalBaseProps) => (
  <ElModalBg className={cx(className && className)} {...rest}>
    {children}
  </ElModalBg>
)

export const Modal: FC<ModalProps> = ({ isOpen, onModalClose, title, className, children, ...rest }) => {
  if (!isOpen) return null

  const modalCombinedClassname = cx(className, elIsActive)

  return (
    <>
      <ElModalBg className={elIsActive} onClick={onModalClose} />
      <ElModal className={modalCombinedClassname} {...rest}>
        {title && <ElModalHeader>{title}</ElModalHeader>}
        <ElModalBody>{children}</ElModalBody>
      </ElModal>
    </>
  )
}
