import React from 'react'
import { Modal, SubTitleH5 } from '@reapit/elements-legacy'
import { Button, elMAuto } from '@reapit/elements'
import { useSubscriptions } from '../hooks/use-subscriptions'

export const SubscriptionModal = ({ visible }: { visible: boolean }) => {
  const { createSubscription, subscriptionsLoading } = useSubscriptions()

  return (
    <Modal
      visible={visible}
      title="Data Warehouse Account"
      footerItems={
        <Button
          className={elMAuto}
          intent="primary"
          onClick={async () => {
            await createSubscription()
            window.location.reload() // todo: this is a hack to reload the data and send them to /user-accounts
          }}
          disabled={subscriptionsLoading}
          loading={subscriptionsLoading}
        >
          Activate Account
        </Button>
      }
    >
      <p>
        <SubTitleH5>How It Works</SubTitleH5>
        Reapit&apos;s data warehouse is a premium service that provides your organisation&apos;s data in an analytics
        focused format. Our cloud-based warehouse technology is supported by all major business intelligence
        applications such as Microsoft Power BI and Tableau, to allow you to extract new value and insights from your
        data.
        <br />
        <br />
        This application can provision a dedicated virtual data warehouse and allow you to manage which users and
        applications have access to it. To continue, please activate your account below:
      </p>
    </Modal>
  )
}
