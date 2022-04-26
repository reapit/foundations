import React, { FC } from 'react'
import { Button, ButtonGroup, Col, FlexContainer, Title, useMediaQuery, Grid, useModal } from '@reapit/elements'
import { AppCard } from './app-card'
import { useAppState } from '../state/use-app-state'
import { Helper } from '../page/helper'

export const AppsList: FC = () => {
  const { isMobile } = useMediaQuery()
  const { appsDataState } = useAppState()
  const { Modal, openModal, closeModal } = useModal()

  const { apps } = appsDataState

  return (
    <>
      <FlexContainer isFlexJustifyBetween>
        <Title>My Apps</Title>
        {isMobile && (
          <ButtonGroup alignment="right">
            <Button intent="low" onClick={openModal}>
              Controls
            </Button>
          </ButtonGroup>
        )}
      </FlexContainer>
      {isMobile && (
        <Modal title="Controls">
          <Helper />
          <ButtonGroup alignment="center">
            <Button fixedWidth intent="secondary" onClick={closeModal}>
              Close
            </Button>
          </ButtonGroup>
        </Modal>
      )}
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
