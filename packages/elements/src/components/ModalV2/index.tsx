import React from 'react'
import Dialog from 'rc-dialog'
import { cx } from 'linaria'
import { modalContainer, modalCentered, modalNoPadding, modalResponsiveContainer, modalNoHeader } from './__styles__'
import { IDialogPropTypes } from 'rc-dialog/lib/IDialogPropTypes'

export interface ModalHeaderV2Props {
  children: React.ReactNode
}

export const ModalHeaderV2: React.FC<ModalHeaderV2Props> = ({ children }) => {
  return <h4 className="modal-card-title is-4 pt-2 pb-2">{children}</h4>
}

export interface ModalPropsV2 extends IDialogPropTypes {
  isCentered?: boolean
  isPadding?: boolean
  isResponsive?: boolean
  hasHeader?: boolean
}

export const ModalV2: React.FC<ModalPropsV2> = ({
  children,
  className,
  wrapClassName,
  destroyOnClose = true,
  isCentered = false,
  isResponsive = false,
  isPadding = true,
  title,
  hasHeader = true,
  afterClose,
  ...restProps
}) => {
  return (
    <Dialog
      {...restProps}
      title={<ModalHeaderV2>{title}</ModalHeaderV2>}
      closeIcon={<span className="delete" aria-label="close" onClick={afterClose} />}
      destroyOnClose={destroyOnClose}
      className={cx(modalContainer, isResponsive && modalResponsiveContainer, !hasHeader && modalNoHeader, className)}
      wrapClassName={cx(isCentered && modalCentered, !isPadding && modalNoPadding, wrapClassName)}
    >
      {children}
    </Dialog>
  )
}

export default React.memo(ModalV2)
