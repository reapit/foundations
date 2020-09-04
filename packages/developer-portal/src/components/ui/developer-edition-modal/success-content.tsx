import { DeveloperModel } from '@reapit/foundations-ts-definitions'
import * as React from 'react'
import { Button, SubTitleH6, ModalHeader, ModalBody, ModalFooter, ModalProps } from '@reapit/elements'
import { link } from '@/styles/elements/link'

export type SuccessContentProps = Pick<ModalProps, 'afterClose'> & {
  developer?: DeveloperModel
}

export const handleDownload = () => {
  window.open(window.reapit.config.developerEditionDownloadUrl, '_self')
}

export const SuccessContent: React.FC<SuccessContentProps> = ({ developer, afterClose }) => {
  if (!developer) return null

  return (
    <>
      <ModalHeader title="Success" />
      <ModalBody
        body={
          <>
            <SubTitleH6 className="has-text-weight-normal">
              You have successfully subscribed 1 Agency Cloud user licence and an email has been sent to the following
              members of your organisation with instructions on how to get started.
            </SubTitleH6>
            <SubTitleH6 className="has-text-weight-normal">
              {developer.name} -&nbsp;
              <a className={link} target="_blank" rel="noopener noreferrer" href={`mailto:${developer.email}`}>
                {developer.email}
              </a>
            </SubTitleH6>
            <SubTitleH6 className="has-text-weight-normal">
              We have added your subscription to your monthly billing. To manage your subscriptions please visit the
              &apos;Billing&apos; tab.
            </SubTitleH6>
            <SubTitleH6 className="has-text-weight-normal">
              Reminder: There is no charge for the Developer Edition Licence during the Beta Phase.
            </SubTitleH6>
          </>
        }
      />
      <ModalFooter
        footerItems={
          <>
            <Button variant="primary" type="button" onClick={afterClose}>
              CLOSE
            </Button>
            <Button variant="primary" type="button" onClick={handleDownload}>
              DOWNLOAD NOW
            </Button>
          </>
        }
      />
    </>
  )
}

export default SuccessContent
