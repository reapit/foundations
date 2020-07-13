import * as React from 'react'
import { Section } from '@reapit/elements'
import { Tabs } from '../tabs'
import AccountsInformationForm from './accounts-information-form'
import Subcriptions from '@/components/pages/settings/billing/subscriptions'

const SettingsBillingTabPage: React.FC<{}> = () => {
  // FEATURE FLAG
  const isProd = window.reapit.config.appEnv === 'production'

  return (
    <>
      <Section>
        <Tabs />
      </Section>
      {// Feature flag
      !isProd && <AccountsInformationForm />}
      <Subcriptions />
    </>
  )
}

export default SettingsBillingTabPage
