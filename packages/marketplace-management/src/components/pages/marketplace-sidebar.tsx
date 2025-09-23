import React, { FC, useCallback } from 'react'
import {
  BodyText,
  elMb5,
  Icon,
  InputGroup,
  SecondaryNav,
  SecondaryNavContainer,
  SecondaryNavItem,
  SmallText,
} from '@reapit/elements'
import { navigateRoute } from '../ui/nav/nav'
import RoutePaths from '../../constants/routes'
import { useLocation, useNavigate } from 'react-router'
import { OrgIdSelect } from '../hocs/org-id-select'
import { ControlsContainer, inputFullWidth } from '../hocs/__styles__'
import debounce from 'just-debounce-it'
import { handleSearch } from './marketplace'
import QueryString from 'qs'

export const MarketplaceSidebar: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { pathname } = location
  const debouncedSearch = useCallback(debounce(handleSearch(navigate), 500), [])
  const searchParams = QueryString.parse(location.search, { ignoreQueryPrefix: true })

  return (
    <SecondaryNavContainer>
      <SecondaryNav>
        <SecondaryNavItem
          onClick={navigateRoute(navigate, RoutePaths.MARKETPLACE)}
          active={pathname === RoutePaths.MARKETPLACE}
        >
          AppMarketplace
        </SecondaryNavItem>
        <SecondaryNavItem
          onClick={navigateRoute(navigate, RoutePaths.MARKETPLACE_INSTALLATIONS)}
          active={pathname.includes(RoutePaths.MARKETPLACE_INSTALLATIONS)}
        >
          Installations
        </SecondaryNavItem>
      </SecondaryNav>
      <Icon className={elMb5} icon="appMarketInfographic" iconSize="large" />
      <BodyText>AppMarket Visibility and Installation Management</BodyText>
      <SmallText hasGreyText>
        To set the visibility of an app in the AppMarket or to manage installations for your organisation or specific
        office groups, please select an app.
      </SmallText>
      <OrgIdSelect />
      <ControlsContainer>
        <InputGroup
          defaultValue={searchParams?.searchTerm as string}
          className={inputFullWidth}
          type="text"
          name="searchTerm"
          label="Search"
          placeholder="Developer or App"
          onChange={debouncedSearch}
        />
      </ControlsContainer>
    </SecondaryNavContainer>
  )
}
