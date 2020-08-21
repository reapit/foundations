import * as React from 'react'
import { useSelector } from 'react-redux'
import { Info, Loader, Section } from '@reapit/elements'
import Subcriptions from '@/components/pages/settings/billing/subscriptions'
import AccountsInformationForm from './accounts-information-form'
import { Tabs } from '../tabs'
import { selectCurrentMemberData, selectCurrentMemberIsLoading } from '@/selector/current-member'

const SettingsBillingTabPage: React.FC<{}> = () => {
  const isProd = window.reapit.config.appEnv === 'production'
  const currentUser = useSelector(selectCurrentMemberData)
  const loading = useSelector(selectCurrentMemberIsLoading)
  if (loading) {
    return <Loader />
  }
  if (currentUser?.role === 'admin') {
    return (
      <>
        <Section>
          <Tabs role={currentUser?.role} />
        </Section>
        {// Feature flag
        !isProd && <AccountsInformationForm />}
        <Subcriptions />
      </>
    )
  }
  return <Info infoType="404" />
}

export default SettingsBillingTabPage
