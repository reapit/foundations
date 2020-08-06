import * as React from 'react'
import { useSelector } from 'react-redux'
import { Info, Loader, Section } from '@reapit/elements'
import Subcriptions from '@/components/pages/settings/billing/subscriptions'
import { selectOrganisationMembers, selectOrganisationMembersLoading } from '@/selector/developers'
import { getCurrentUserRole } from '../settings'
import AccountsInformationForm from './accounts-information-form'
import { Tabs } from '../tabs'
import { selectSettingsPageDeveloperInformation } from '@/selector/settings'

const SettingsBillingTabPage: React.FC<{}> = () => {
  const isProd = window.reapit.config.appEnv === 'production'
  const developerInfo = useSelector(selectSettingsPageDeveloperInformation)
  const invitedMember = useSelector(selectOrganisationMembers)
  const role = getCurrentUserRole(invitedMember, developerInfo.id)
  const invitedMemberLoading = useSelector(selectOrganisationMembersLoading)
  if (!developerInfo?.id || invitedMemberLoading) {
    return <Loader />
  }
  if (role === 'admin') {
    return (
      <>
        <Section>
          <Tabs role={role} />
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
