import React, { FC } from 'react'
import { Button, ButtonGroup, Col, FlexContainer, Title, useMediaQuery, Grid } from '@reapit/elements'
import { ExternalPages, openNewPage } from '../../../utils/navigation'
import { AppCard } from './app-card'
import { useAppState } from '../state/use-app-state'

export const AppsList: FC = () => {
  const { isMobile } = useMediaQuery()
  const { appsDataState } = useAppState()

  const { apps } = appsDataState

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
            <AppCard app={app} />
          </Col>
        ))}
      </Grid>
    </>
  )
}

export default AppsList
