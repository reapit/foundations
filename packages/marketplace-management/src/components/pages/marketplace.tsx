import React, { ChangeEvent, FC, useCallback } from 'react'
import { useNavigate, useLocation, NavigateFunction } from 'react-router'
import Routes from '../../constants/routes'
import { AppSummaryModelPagedResult } from '@reapit/foundations-ts-definitions'
import AppCard from '../ui/apps/app-card'
import {
  Button,
  ButtonGroup,
  Col,
  elHFull,
  FlexContainer,
  Grid,
  InputGroup,
  Loader,
  PageContainer,
  Pagination,
  PersistentNotification,
  Title,
  useMediaQuery,
  useModal,
} from '@reapit/elements'
import { useOrgId } from '../../utils/use-org-id'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { OrgIdSelect } from '../hocs/org-id-select'
import { useReapitGet, GetActionNames, getActions } from '@reapit/use-reapit-data'
import qs from 'qs'
import { useReapitConnect } from '@reapit/connect-session'
import debounce from 'just-debounce-it'
import { ControlsContainer } from '../hocs/__styles__'
import { MarketplaceSidebar } from './marketplace-sidebar'

export const onPageChangeHandler = (navigate: NavigateFunction) => (pageNumber: number) => {
  const queryParams = qs.parse(window.location.search, { ignoreQueryPrefix: true })
  const queryString = qs.stringify({
    ...queryParams,
    pageSize: 12,
    pageNumber,
  })

  return navigate(`${Routes.MARKETPLACE}?${queryString}`)
}

export const handleSearch = (navigate: NavigateFunction) => (event: ChangeEvent<HTMLInputElement>) => {
  const search = event.target.value.toLowerCase()

  const searchTerm = search ? { searchTerm: search } : {}

  const queryString = qs.stringify({
    pageSize: 12,
    pageNumber: 1,
    ...searchTerm,
  })

  return navigate(`${Routes.MARKETPLACE}?${queryString}`)
}

export const MarketplacePage: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { Modal, openModal, closeModal } = useModal()
  const { isMobile } = useMediaQuery()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const onPageChange = useCallback(onPageChangeHandler(navigate), [navigate])
  const searchParams = qs.parse(location.search, { ignoreQueryPrefix: true })
  const debouncedSearch = useCallback(debounce(handleSearch(navigate), 500), [])

  const {
    orgIdState: { orgName, orgClientId },
  } = useOrgId()

  const [appData, appLoading] = useReapitGet<AppSummaryModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getApps],
    queryParams: { showHiddenApps: 'true', clientId: orgClientId, ...searchParams },
    fetchWhenTrue: [orgClientId],
  })

  return (
    <FlexContainer isFlexAuto>
      <MarketplaceSidebar />
      <PageContainer className={elHFull}>
        <FlexContainer isFlexJustifyBetween>
          <Title>{orgName} AppMarket</Title>
          {isMobile && (
            <ButtonGroup alignment="right">
              <Button intent="default" onClick={openModal}>
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
                  <Button intent="primary" onClick={closeModal}>
                    Close
                  </Button>
                </ButtonGroup>
              </Modal>
            </ButtonGroup>
          )}
        </FlexContainer>
        {!orgClientId ? (
          <PersistentNotification isFullWidth isExpanded intent="primary" isInline>
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
