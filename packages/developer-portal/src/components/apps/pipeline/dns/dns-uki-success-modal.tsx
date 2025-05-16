import React, { FC } from 'react'
import { BodyText, Button, Modal, Subtitle } from '@reapit/elements'

export const DnsUKISuccessModal: FC<{ modalIsOpen: boolean; onModalClose: () => void }> = ({
  modalIsOpen,
  onModalClose,
}) => {
  return (
    <Modal isOpen={modalIsOpen} onModalClose={onModalClose}>
      <Subtitle>Success</Subtitle>
      <BodyText>
        We have successfully created the custom domain certificate. As you are using a <code>reapit.cloud</code>
        domain, we have automatically provided the details to verify/register the certificate to the DevOps team. Once
        they have completed the setup, the certificate status will be updated and your domain will be live.
      </BodyText>
      <Button intent="secondary" onClick={onModalClose}>
        Close
      </Button>
    </Modal>
  )
}
