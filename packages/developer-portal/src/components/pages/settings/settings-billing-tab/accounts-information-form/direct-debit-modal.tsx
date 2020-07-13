import * as React from 'react'
import { ModalV2, ModalPropsV2, H4, H6, Button, FlexContainerResponsive } from '@reapit/elements'

type DirectDebitModalProps = Pick<ModalPropsV2, 'onClose' | 'visible'> & {}

export const DirectDebitModal: React.FC<DirectDebitModalProps> = ({ onClose, visible }) => {
  return (
    <ModalV2
      title={<H4>Foundations Direct Debit</H4>}
      visible={visible}
      onClose={onClose}
      footer={
        <FlexContainerResponsive centerContent isFullHeight={false}>
          <H6 className="mb-0 mr-4">Once you have completed this form, please click here to continue</H6>
          <Button>Finish</Button>
        </FlexContainerResponsive>
      }
    >
      Direct Debit Form
    </ModalV2>
  )
}

export default DirectDebitModal
