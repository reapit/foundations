import * as React from 'react'
import { Button, Modal, ModalProps } from '@reapit/elements'

export interface SubmitAppReadDocModalProps extends Omit<ModalProps, 'children'> {
  onContinueClick?: () => void
  onViewDocClick?: () => void
}

export const SubmitAppReadDocModal: React.FC<SubmitAppReadDocModalProps> = ({
  visible,
  title = 'Important',
  onContinueClick,
  onViewDocClick,
  tapOutsideToDissmiss = false,
  ...rest
}) => {
  return (
    <Modal
      visible={visible}
      title={title}
      tapOutsideToDissmiss={tapOutsideToDissmiss}
      footerItems={
        <>
          <Button variant="primary" type="button" onClick={onContinueClick}>
            YES, CONTINUE
          </Button>
          <Button variant="primary" type="button" onClick={onViewDocClick}>
            NO, VIEW DOCS
          </Button>
        </>
      }
      {...rest}
    >
      Before continuing with registering your app, we strongly advise that you read the step to step guide on how best
      to complete the following form. Please confirm if have read the documentation?
    </Modal>
  )
}
