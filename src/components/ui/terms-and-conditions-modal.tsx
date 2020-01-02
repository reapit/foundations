import * as React from 'react'
import { Button, Modal, ModalProps } from '@reapit/elements'

export type TermsAndConditionsModalProps = {
  onAccept: () => void
  onDecline: () => void
  text?: string
} & Pick<ModalProps, 'visible' | 'afterClose'>

const placeholderText = `
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam porro, id quidem maxime nesciunt facere
      voluptatem at provident. Iste fugit ut nesciunt minima? Non rem ut quod deserunt quibusdam, illo quos beatae
      perspiciatis, voluptate quas eligendi vel, autem similique. Autem illo rerum doloribus, quia eius corrupti
      sapiente aliquid ea pariatur enim? Earum itaque mollitia impedit commodi cum, ratione, suscipit sunt similique
      asperiores illo ducimus iusto in, eum eos dolor corrupti. Ad assumenda temporibus ullam reiciendis autem
      recusandae harum quod, non iste, eligendi nihil? Unde quasi quaerat eveniet illo consectetur asperiores nostrum
      alias nobis ratione! Dolorum repellendus aut iure blanditiis nostrum.
`

export const TermsAndConditionsModal: React.FunctionComponent<TermsAndConditionsModalProps> = ({
  visible,
  afterClose,
  onAccept,
  onDecline,
  text = placeholderText
}) => {
  return (
    <Modal
      title="Terms and Conditions"
      visible={visible}
      afterClose={afterClose}
      footerItems={
        <>
          <Button variant="secondary" type="button" onClick={onDecline}>
            Decline
          </Button>
          <Button dataTest="buttonAcceptTermsAndConditions" variant="primary" type="button" onClick={onAccept}>
            Accept
          </Button>
        </>
      }
    >
      {text}
    </Modal>
  )
}

export default TermsAndConditionsModal
