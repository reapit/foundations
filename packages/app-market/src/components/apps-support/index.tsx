import React, { ChangeEvent, Dispatch, FC, SetStateAction, useCallback, useState } from 'react'
import {
  Button,
  Col,
  elHFull,
  elMb11,
  elMb5,
  FlexContainer,
  Grid,
  Icon,
  Loader,
  PageContainer,
  SecondaryNavContainer,
  SmallText,
  Title,
} from '@reapit/elements'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { openNewPage } from '../../utils/navigation'
import { appsSearchContainer, AppsSearchInput, appsSearchInputIcon } from '../apps-browse/__styles__'
import debounce from 'just-debounce-it'
import { AppSummaryModelPagedResult } from '@reapit/foundations-ts-definitions'
import { useReapitGet } from '@reapit/utils-react'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { AppsSupportItem } from './apps-support-item'
import { PersistentNotification } from '@reapit/elements'
import { cx } from '@linaria/core'

export const handleSearch = (setSearch: Dispatch<SetStateAction<string>>) => (event: ChangeEvent<HTMLInputElement>) => {
  const search = event.target.value.toLowerCase()
  setSearch(search)
}

export const AppsSupportPage: FC = () => {
  const [search, setSearch] = useState<string>('')
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const clientId = connectSession?.loginIdentity.clientId
  const debouncedSearch = useCallback(debounce(handleSearch(setSearch), 500), [])

  const [apps, appsLoading] = useReapitGet<AppSummaryModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getApps],
    queryParams: { clientId, appName: search, pageSize: 25, includeHiddenApps: true, onlyInstalled: true },
    fetchWhenTrue: [search, clientId],
  })

  return (
    <FlexContainer isFlexAuto>
      <SecondaryNavContainer>
        <Title>Support</Title>
        <Icon className={elMb5} icon="userInfographic" iconSize="large" />
        <SmallText hasGreyText>
          For AppMarket support, you will need to contact the app developer directly. You can find the relevant contact
          details by searching by app name.
        </SmallText>
        <SmallText hasGreyText>
          In addition we have provided comprehensive documentation on using the AppMarket at the below link.
        </SmallText>
        <Button onClick={openNewPage('')} intent="neutral">
          View Docs
        </Button>
      </SecondaryNavContainer>
      <PageContainer className={elHFull}>
        <FlexContainer className={cx(appsSearchContainer, elMb11)} isFlexAlignCenter>
          <Icon className={appsSearchInputIcon} icon="searchSystem" fontSize="1.25rem" />
          <AppsSearchInput type="text" placeholder="Search" onChange={debouncedSearch} />
        </FlexContainer>
        {!search && !apps && !appsLoading && (
          <PersistentNotification isInline isExpanded isFullWidth intent="secondary">
            Search for an app name to get started
          </PersistentNotification>
        )}
        {appsLoading ? (
          <Loader />
        ) : (
          <Grid>
            {apps?.data?.map((app) => (
              <Col key={app.id}>
                <AppsSupportItem app={app} />
              </Col>
            ))}
          </Grid>
        )}
      </PageContainer>
    </FlexContainer>
  )
}

export default AppsSupportPage
