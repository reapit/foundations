import routes from '@/constants/routes'
import { history } from '@/core/router'
import React from 'react'
import { Button, Modal } from '@reapit/elements'

export const handleBtnBackToMarketplace = () => {
  history.push(routes.APPS)
}

export const handleBtnGoTherNow = () => {
  console.log(window.reapit.config.developerPortalUrl)

  window.open(window.reapit.config.developerPortalUrl, '_self')
}

const HandleLegacyRoutesModal: React.FC<{}> = () => {
  return (
    <Modal
      visible
      tapOutsideToDissmiss={false}
      title="Looking for the developer portal?"
      footerItems={
        <>
          <Button type="button" variant="primary" onClick={handleBtnGoTherNow}>
            Go there now
          </Button>
          <Button type="button" variant="primary" onClick={handleBtnBackToMarketplace}>
            Back to Marketplace
          </Button>
        </>
      }
    >
      <>
        The developer portal has permanently moved to{' '}
        <a href={window.reapit.config.developerPortalUrl}>{window.reapit.config.developerPortalUrl}</a> Please remove
        any bookmarks to this page and in future visit the developer portal direct. Thankyou.
      </>
    </Modal>
  )
}

export default HandleLegacyRoutesModal
