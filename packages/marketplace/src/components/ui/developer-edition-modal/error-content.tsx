import * as React from 'react'
import { Button, SubTitleH6, ModalHeader, ModalBody, ModalFooter, ModalProps } from '@reapit/elements'
import linkStyles from '@/styles/elements/link.scss?mod'
import developerEditionStyles from '@/styles/blocks/developer-edition-modal.scss?mod'

const HELP_PAGE_LINK = 'https://marketplace.reapit.cloud/developer/help'

export type ErrorContentProps = Pick<ModalProps, 'afterClose'>

export const ErrorContent: React.FC<ErrorContentProps> = ({ afterClose }) => {
  return (
    <>
      <ModalHeader title="Existing Subscription" />
      <ModalBody
        body={
          <SubTitleH6 className={developerEditionStyles.subTitle}>
            It looks as though you already have a subscription in place for the Developer Edition of Agency Cloud. If
            you have not received your email with instructions on how to download, please let us know using the live
            chat feature on the{' '}
            <a className={linkStyles.link} target="_blank" rel="noopener noreferrer" href={HELP_PAGE_LINK}>
              &apos;Help&apos;
            </a>{' '}
            page.
          </SubTitleH6>
        }
      />
      <ModalFooter
        footerItems={
          <Button variant="primary" type="button" onClick={afterClose}>
            CLOSE
          </Button>
        }
      />
    </>
  )
}

export default ErrorContent
