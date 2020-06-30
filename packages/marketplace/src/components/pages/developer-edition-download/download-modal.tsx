import React, { useState } from 'react'
import { Modal, Button } from '@reapit/elements'

export const onDownload = (setIsCompleted: React.Dispatch<boolean>) => (): void => {
  setIsCompleted(true)
  window.open(window.reapit.config.developerEditionDownloadUrl, '_self')
}

export const DeveloperEditionDownload: React.FC = () => {
  const [isCompleted, setIsCompleted] = useState<boolean>(false)
  const handleDownload = onDownload(setIsCompleted)

  if (isCompleted)
    return (
      <Modal visible title="Download Complete">
        <p>The download of the Developer Edition of Agency Cloud has been completed.</p>
      </Modal>
    )

  return (
    <Modal visible title="Agency Cloud Developer Edition">
      <>
        <p>
          To start the download, please click ‘Start Download’ below. It will automatically download an application file
          which you will need to run and install the required document files. For more information or support using the
          Developer Edition, please <a>click here</a>
        </p>
        <Button className="is-pulled-right mt-5" onClick={handleDownload}>
          START DOWNLOAD
        </Button>
      </>
    </Modal>
  )
}

export default DeveloperEditionDownload
