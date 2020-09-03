import * as React from 'react'
import { Button, SubTitleH6, ModalHeader, ModalBody, ModalFooter, ModalProps } from '@reapit/elements'
import linkStyles from '@/styles/elements/link.scss?mod'
import routes from '@/constants/routes'

export type ErrorContentProps = Pick<ModalProps, 'afterClose'>

export const ErrorContent: React.FC<ErrorContentProps> = ({ afterClose }) => {
  return (
    <>
      <ModalHeader title="Existing Subscription" />
      <ModalBody
        body={
          <SubTitleH6 className="has-text-weight-normal">
            It looks as though you already have a subscription in place for the Developer Edition of Agency Cloud. If
            you have not received your email with instructions on how to download, please let us know using the live
            chat feature on the&nbsp;
            <a className={linkStyles.link} target="_blank" rel="noopener noreferrer" href={routes.HELP}>
              &apos;Help&apos;
            </a>
            &nbsp;page.
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
