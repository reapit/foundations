import routes from '@/constants/routes'
import { history } from '@/core/router'
import React from 'react'
import { Button, Modal } from '@reapit/elements-legacy'

export const handleBtnBackToMarketplace = () => {
  history.push(routes.APPS)
}

export const handleBtnGoThereNow = () => {
  window.open('https://developer-admin.reapit.cloud', '_self', 'noopener')
}

const HandleLegacyAdminRoutesModal: React.FC<{}> = () => {
  return (
    <Modal
      visible
      tapOutsideToDissmiss={false}
      title="Looking for the admin portal?"
      footerItems={
        <>
          <Button type="button" variant="primary" onClick={handleBtnGoThereNow}>
            Go there now
          </Button>
          <Button type="button" variant="primary" onClick={handleBtnBackToMarketplace}>
            Back to Marketplace
          </Button>
        </>
      }
    >
      <>
        The admin portal has permanently moved to{' '}
        <a href={'https://developer-admin.reapit.cloud'}>{'https://developer-admin.reapit.cloud'}</a> Please remove any
        bookmarks to this page and in future visit the developer portal direct. Thankyou.
      </>
    </Modal>
  )
}

export default HandleLegacyAdminRoutesModal
