import React, { FC } from 'react'
import { AppSummaryModelPagedResult } from '@reapit/foundations-ts-definitions'
import { Button, ButtonGroup, Col, FlexContainer, Title, useMediaQuery, Grid } from '@reapit/elements'
import { ExternalPages, openNewPage } from '../../../../utils/navigation'
import { AppCard } from './app-card'

export interface AppsPageProps {
  apps: AppSummaryModelPagedResult
  refreshApps: () => void
}

export const AppsPage: FC<AppsPageProps> = ({ apps, refreshApps }) => {
  const { isMobile } = useMediaQuery()

  return (
    <>
      <FlexContainer isFlexJustifyBetween>
        <Title>My Apps</Title>
        {isMobile && (
          <ButtonGroup alignment="right">
            <Button intent="low" onClick={openNewPage(ExternalPages.developerPortalDocs)}>
              Docs
            </Button>
          </ButtonGroup>
        )}
      </FlexContainer>
      <Grid>
        {apps?.data?.map((app) => (
          <Col key={app.id}>
            <AppCard app={app} refreshApps={refreshApps} />
          </Col>
        ))}
      </Grid>
    </>
  )
}

export default AppsPage
