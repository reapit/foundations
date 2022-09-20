import React, { ChangeEvent, FC, useCallback } from 'react'
import { useHistory, useLocation } from 'react-router'
import { History } from 'history'
import Routes from '../../constants/routes'
import { AppSummaryModelPagedResult } from '@reapit/foundations-ts-definitions'
import AppCard from '../ui/apps/app-card'
import {
  BodyText,
  Button,
  ButtonGroup,
  Col,
  elHFull,
  elMb5,
  FlexContainer,
  Grid,
  Icon,
  InputGroup,
  Loader,
  PageContainer,
  Pagination,
  PersistentNotification,
  SecondaryNavContainer,
  Subtitle,
  Title,
  useMediaQuery,
  useModal,
} from '@reapit/elements'
import { useOrgId } from '../../utils/use-org-id'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { OrgIdSelect } from '../hocs/org-id-select'
import { useReapitGet } from '@reapit/utils-react'
import { GetActionNames, getActions } from '@reapit/utils-common'
import qs from 'qs'
import { useReapitConnect } from '@reapit/connect-session'
import debounce from 'just-debounce-it'
import { ControlsContainer, inputFullWidth } from '../hocs/__styles__'

export const onPageChangeHandler = (history: History<any>) => (pageNumber: number) => {
  const queryParams = qs.parse(history.location.search, { ignoreQueryPrefix: true })
  const queryString = qs.stringify({
    ...queryParams,
    pageSize: 12,
    pageNumber,
  })

  return history.push(`${Routes.MARKETPLACE}?${queryString}`)
}

export const handleSearch = (history: History<any>) => (event: ChangeEvent<HTMLInputElement>) => {
  const search = event.target.value.toLowerCase()

  const searchTerm = search ? { searchTerm: search } : {}

  const queryString = qs.stringify({
    pageSize: 12,
    pageNumber: 1,
    ...searchTerm,
  })

  return history.push(`${Routes.MARKETPLACE}?${queryString}`)
}

export const MarketplacePage: FC = () => {
  const history = useHistory()
  const location = useLocation()
  const { Modal, openModal, closeModal } = useModal()
  const { isMobile } = useMediaQuery()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const onPageChange = useCallback(onPageChangeHandler(history), [history])
  const searchParams = qs.parse(location.search, { ignoreQueryPrefix: true })
  const debouncedSearch = useCallback(debounce(handleSearch(history), 500), [])

  const {
    orgIdState: { orgName, orgClientId },
  } = useOrgId()

  const [appData, appLoading] = useReapitGet<AppSummaryModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getApps],
    queryParams: { showHiddenApps: 'true', clientId: orgClientId, ...searchParams },
    fetchWhenTrue: [orgClientId],
  })

  return (
    <FlexContainer isFlexAuto>
      <SecondaryNavContainer>
        <Title>Apps</Title>
        <Icon className={elMb5} icon="appInfographicAlt" iconSize="large" />
        <Subtitle>AppMarket Visibility and Installation Management</Subtitle>
        <BodyText hasGreyText>
          To set the visibility of an app in the AppMarket or to manage installations for your organisation or specific
          office groups, please select an app.
        </BodyText>
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
      <PageContainer className={elHFull}>
        <FlexContainer isFlexJustifyBetween>
          <Title>{orgName} AppMarket</Title>
          {isMobile && (
            <ButtonGroup alignment="right">
              <Button intent="low" onClick={openModal}>
                Select Org
              </Button>
              <Modal title="Page Controls">
                <OrgIdSelect />
                <ControlsContainer>
                  <InputGroup
                    value={searchParams?.searchTerm as string}
                    type="text"
                    name="searchTerm"
                    label="Search"
                    placeholder="Developer or App Name"
                    onChange={debouncedSearch}
                  />
                </ControlsContainer>
                <ButtonGroup alignment="center">
                  <Button intent="secondary" onClick={closeModal}>
                    Close
                  </Button>
                </ButtonGroup>
              </Modal>
            </ButtonGroup>
          )}
        </FlexContainer>
        {!orgClientId ? (
          <PersistentNotification isFullWidth isExpanded intent="secondary" isInline>
            No organisation selected. You need to select an organisation to view available apps.
          </PersistentNotification>
        ) : appLoading ? (
          <Loader />
        ) : (
          <>
            <Grid>
              {connectSession &&
                appData?.data?.map((app) => (
                  <Col key={app.id}>
                    <AppCard app={app} connectSession={connectSession} />
                  </Col>
                ))}
            </Grid>
            <Pagination
              callback={onPageChange}
              numberPages={Math.ceil((appData?.totalCount ?? 0) / (appData?.pageSize ?? 0))}
              currentPage={appData?.pageNumber ?? 0}
            />
          </>
        )}
      </PageContainer>
    </FlexContainer>
  )
}

export default MarketplacePage
