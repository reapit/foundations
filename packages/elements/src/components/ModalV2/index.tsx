import React from 'react'
import Dialog from 'rc-dialog'
import { cx } from 'linaria'
import IDialogPropTypes from 'rc-dialog/lib/IDialogPropTypes'
import { modalContainer } from './__styles__'

export interface ModalPropsV2 extends IDialogPropTypes {}

export const ModalV2: React.FC<IDialogPropTypes> = ({
  children,
  className,
  wrapClassName,
  destroyOnClose = true,
  ...restProps
}) => {
  return (
    <Dialog
      {...restProps}
      destroyOnClose={destroyOnClose}
      className={cx(modalContainer, className)}
      wrapClassName={cx(wrapClassName)}
    >
      {children}
    </Dialog>
  )
}

export default React.memo(ModalV2)
