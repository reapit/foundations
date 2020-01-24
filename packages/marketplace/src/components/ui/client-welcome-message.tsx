import * as React from 'react'
import { Button, Modal, ModalProps, SubTitleH6 } from '@reapit/elements'

export type ClientWelcomeMessageModalProps = {
  onAccept: () => void
} & Pick<ModalProps, 'visible'>

export const ClientWelcomeMessageModal: React.FunctionComponent<ClientWelcomeMessageModalProps> = ({
  visible,
  onAccept,
}) => {
  return (
    <Modal
      tapOutsideToDissmiss={false}
      size="medium"
      visible={visible}
      footerItems={
        <Button variant="primary" type="button" onClick={onAccept} dataTest="button-accept-welcome-message-modal">
          Accept
        </Button>
      }
      HeaderComponent={() => (
        <header className="modal-card-head">
          <h4 className="modal-card-title is-4">Welcome to Reapit Marketplace</h4>
        </header>
      )}
    >
      <>
        <SubTitleH6>
          In order to access the Marketplace, please read and accept the following Terms and Conditions.
        </SubTitleH6>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam porro, id quidem maxime nesciunt facere
        voluptatem at provident. Iste fugit ut nesciunt minima? Non rem ut quod deserunt quibusdam, illo quos beatae
        perspiciatis, voluptate quas eligendi vel, autem similique. Autem illo rerum doloribus, quia eius corrupti
        sapiente aliquid ea pariatur enim? Earum itaque mollitia impedit commodi cum, ratione, suscipit sunt similique
        asperiores illo ducimus iusto in, eum eos dolor corrupti. Ad assumenda temporibus ullam reiciendis autem
        recusandae harum quod, non iste, eligendi nihil? Unde quasi quaerat eveniet illo consectetur asperiores nostrum
        alias nobis ratione! Dolorum repellendus aut iure blanditiis nostrum.
      </>
    </Modal>
  )
}

export default ClientWelcomeMessageModal
