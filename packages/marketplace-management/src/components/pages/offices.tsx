import React, { FC } from 'react'
import { useNavigate, useLocation, Routes } from 'react-router'
import { Route } from 'react-router-dom'
import RoutePaths from '../../constants/routes'
import OfficesTab from '../ui/offices/offices-tab'
import OfficesGroupsTab from '../ui/offices/offices-groups-tab'
import {
  BodyText,
  Button,
  elHFull,
  elMb5,
  FlexContainer,
  Icon,
  PageContainer,
  SecondaryNav,
  SecondaryNavContainer,
  SecondaryNavItem,
} from '@reapit/elements'
import { navigateRoute } from '../ui/nav/nav'
import OfficeGroupCreate from '../ui/offices/office-group-create'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { OFFICE_GROUPS_DOCS_URL } from '../../constants/api'
import { OrgIdSelect } from '../hocs/org-id-select'

export const handleDocs = (connectIsDesktop: Boolean) => () => {
  return connectIsDesktop
    ? (window.location.href = `agencycloud://process/webpage?url=${OFFICE_GROUPS_DOCS_URL}`)
    : window.open(OFFICE_GROUPS_DOCS_URL, '_blank')
}

const OfficesPage: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { pathname } = location
  const { connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)

  return (
    <FlexContainer isFlexAuto>
      <SecondaryNavContainer>
        <SecondaryNav>
          <SecondaryNavItem
            onClick={navigateRoute(navigate, RoutePaths.OFFICES)}
            active={pathname === RoutePaths.OFFICES}
          >
            Offices
          </SecondaryNavItem>
          <SecondaryNavItem
            onClick={navigateRoute(navigate, RoutePaths.OFFICES_GROUPS)}
            active={pathname.includes(RoutePaths.OFFICES_GROUPS)}
          >
            Office Groups
          </SecondaryNavItem>
        </SecondaryNav>
        <Icon className={elMb5} icon="developmentInfographic" iconSize="large" />
        <BodyText hasGreyText>
          {pathname === RoutePaths.OFFICES
            ? 'This list contains all ‘Offices’ within your organisation. To create or manage an Office Group, please visit the ‘Office Groups’ page.'
            : pathname === RoutePaths.OFFICES_GROUPS
              ? 'This list contains all ‘Offices Groups’ within your organisation. To view a list of offices in your organisation, please visit the ‘Offices page. To create a new office group, click `Create Group` below.'
              : 'You can create an office group with this wizard. If you want to update the information later, refer to the office groups page.'}
        </BodyText>
        {pathname === RoutePaths.OFFICES_GROUPS && (
          <>
            <Button className={elMb5} intent="primary" onClick={navigateRoute(navigate, RoutePaths.OFFICES_GROUPS_NEW)}>
              Create Group
            </Button>
            <Button className={elMb5} onClick={handleDocs(connectIsDesktop)}>
              Docs
            </Button>
          </>
        )}
        <OrgIdSelect />
      </SecondaryNavContainer>
      <PageContainer className={elHFull}>
        <Routes>
          <Route index element={<OfficesTab />} />
          <Route path={RoutePaths.OFFICES_GROUPS.replace('/offices/', '')} element={<OfficesGroupsTab />} />
          <Route path={RoutePaths.OFFICES_GROUPS_NEW.replace('/offices/', '')} element={<OfficeGroupCreate />} />
        </Routes>
      </PageContainer>
    </FlexContainer>
  )
}

export default OfficesPage
