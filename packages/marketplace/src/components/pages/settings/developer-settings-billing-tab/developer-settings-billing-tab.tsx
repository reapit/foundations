import * as React from 'react'
import { FlexContainerResponsive, Content, FlexContainerBasic, H3 } from '@reapit/elements'
import { Tabs } from '../tabs'
import AccountsInformationForm from './accounts-information-form'
import { Redirect } from 'react-router-dom'
import { selectIsAdmin } from '@/selector/auth'
import { useSelector } from 'react-redux'
import Subcriptions from '@/components/ui/developer-settings/billing/subscriptions'

const DevelperSettingsBillingTabPage: React.FC<{}> = () => {
  const isAdmin = useSelector(selectIsAdmin)
  // FEATURE FLAG
  const isProd = window.reapit.config.appEnv === 'production'

  if (!isAdmin) {
    /**
     * This page is only for admin (which is also a developer)
     *
     * Can't set allow in PrivateRoute component to "ADMIN" because
     * It would change to loginType = 'ADMIN' which set the navbar to admin navbar
     *
     * https://github.com/reapit/foundations/issues/1340
     * Requirement is this page should be used on developer portal and developer navbar.
     * TODO: refactor the the private router or this after the release?
     */
    return <Redirect to="/404" />
  }

  return (
    <FlexContainerBasic flexColumn hasPadding>
      <Content>
        <FlexContainerResponsive flexColumn hasBackground hasPadding>
          <Tabs />
          <Content>
            {// FEATURE FLAG
            !isProd && (
              <FlexContainerResponsive flexColumn hasBackground hasPadding>
                <H3>Accounts Information</H3>
                <AccountsInformationForm />
              </FlexContainerResponsive>
            )}
            <FlexContainerResponsive flexColumn hasBackground hasPadding>
              <Subcriptions />
            </FlexContainerResponsive>
          </Content>
        </FlexContainerResponsive>
      </Content>
    </FlexContainerBasic>
  )
}

export default DevelperSettingsBillingTabPage
