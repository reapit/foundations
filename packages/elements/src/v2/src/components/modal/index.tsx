import React from 'react'
import Dialog from 'rc-dialog'
import { cx } from 'linaria'
import IDialogPropTypes from 'rc-dialog/lib/IDialogPropTypes'
import { modalContainer } from './__styles__'

export interface ModalProps extends IDialogPropTypes {}

export const Modal: React.FC<IDialogPropTypes> = ({ children, className, wrapClassName, ...restProps }) => {
  return (
    <Dialog {...restProps} className={cx(modalContainer, className)} wrapClassName={cx(wrapClassName)}>
      {children}
    </Dialog>
  )
}

export default React.memo(Modal)
