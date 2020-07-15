import React from 'react'
import Dialog from 'rc-dialog'
import { cx } from 'linaria'
import IDialogPropTypes from 'rc-dialog/lib/IDialogPropTypes'
import { modalContainer, modalCentered } from './__styles__'

export interface ModalProps extends IDialogPropTypes {
  isCentered?: boolean
}

export const Modal: React.FC<ModalProps> = ({
  children,
  className,
  wrapClassName,
  isCentered = false,
  ...restProps
}) => {
  return (
    <Dialog
      {...restProps}
      className={cx(modalContainer, className)}
      wrapClassName={cx(wrapClassName, isCentered && modalCentered)}
    >
      {children}
    </Dialog>
  )
}

export default React.memo(Modal)
