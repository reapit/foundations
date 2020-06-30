import * as React from 'react'
import { selectLoginIdentity } from '@/selector/auth'
import { useSelector } from 'react-redux'
import { Loader, FlexContainerResponsive, Content, FlexContainerBasic } from '@reapit/elements'
import { Forms } from './forms/forms'
import { Tabs } from '../tabs'

/**
 * render one of:
 * developer version and admin version - profile tab
 * ^ they both sit on "/developer/settings" route which is so confusing atm
 */
const DevelperSettingsPage: React.FC = () => {
  // it take a while to 'AUTH_LOGIN_SUCCESS' to fire. If you user is admin, they may exerience a flash
  // this make sure settings page don't render until 'loginIdentity' is availabe
  const loginIdentity = useSelector(selectLoginIdentity)

  if (!loginIdentity) {
    return <Loader />
  }

  return (
    <FlexContainerBasic flexColumn hasPadding>
      <Content>
        <FlexContainerResponsive flexColumn hasBackground hasPadding>
          <div>
            <Tabs />
            <Forms />
          </div>
        </FlexContainerResponsive>
      </Content>
    </FlexContainerBasic>
  )
}

export default DevelperSettingsPage
