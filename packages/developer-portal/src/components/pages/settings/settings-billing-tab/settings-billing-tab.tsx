import * as React from 'react'
import { useSelector } from 'react-redux'
import { Info } from '@reapit/elements-legacy'
import Subcriptions from '@/components/pages/settings/billing/subscriptions'
import { selectCurrentMemberData, selectCurrentMemberIsLoading } from '@/selector/current-member'
import { Loader } from '@reapit/elements'

const SettingsBillingTabPage: React.FC<{}> = () => {
  const currentUser = useSelector(selectCurrentMemberData)
  const loading = useSelector(selectCurrentMemberIsLoading)
  if (loading) {
    return <Loader label="Loading" fullPage />
  }
  if (currentUser?.role === 'admin') {
    return (
      <>
        <Subcriptions />
      </>
    )
  }
  return <Info infoType="404" />
}

export default SettingsBillingTabPage
