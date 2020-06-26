import * as React from 'react'
import { Section } from '@reapit/elements'
import { Tabs } from '../tabs'
import AccountsInformationForm from './accounts-information-form'
import Subcriptions from '@/components/ui/developer-settings/billing/subscriptions'

const DevelperSettingsBillingTabPage: React.FC<{}> = () => {
  // FEATURE FLAG
  const isProd = window.reapit.config.appEnv === 'production'

  return (
    <>
      <Section>
        <Tabs />
        {// FEATURE FLAG
        !isProd && <AccountsInformationForm />}
      </Section>
      <Section>
        <Subcriptions />
      </Section>
    </>
  )
}

export default DevelperSettingsBillingTabPage
