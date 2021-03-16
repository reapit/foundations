import * as React from 'react'
import { Button, SubTitleH6, ModalHeader, ModalBody, ModalFooter, ModalProps, ButtonGroup } from '@reapit/elements'
import { link } from '@/styles/elements/link'

import developerEditionGuide from '@/assets/files/developer-edition-guide.pdf'

export const handleDownload = () => {
  window.open(window.reapit.config.developerEditionDownloadUrl, '_self')
}

export type ErrorContentProps = Pick<ModalProps, 'afterClose'>

export const ErrorContent: React.FC<ErrorContentProps> = ({ afterClose }) => {
  return (
    <>
      <ModalHeader title="Existing Subscription" />
      <ModalBody
        body={
          <SubTitleH6 className="has-text-weight-normal">
            It looks as though you already have a subscription in place for the Developer Edition of Agency Cloud. To
            download, please use the ‘Download Now’ button below. For more information or support using the Developer
            Edition, please&nbsp;
            <a className={link} target="_blank" rel="noopener noreferrer" href={developerEditionGuide}>
              click here
            </a>
          </SubTitleH6>
        }
      />
      <ModalFooter
        footerItems={
          <ButtonGroup isCentered hasSpacing>
            <Button variant="secondary" type="button" onClick={afterClose}>
              CLOSE
            </Button>
            <Button variant="primary" type="button" onClick={handleDownload}>
              DOWNLOAD NOW
            </Button>
          </ButtonGroup>
        }
      />
    </>
  )
}

export default ErrorContent
