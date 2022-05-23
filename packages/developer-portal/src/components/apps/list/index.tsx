import React, { FC } from 'react'
import {
  Button,
  ButtonGroup,
  Col,
  FlexContainer,
  Title,
  useMediaQuery,
  Grid,
  useModal,
  Pagination,
  elMb11,
} from '@reapit/elements'
import { AppCard } from './app-card'
import { useAppState } from '../state/use-app-state'
import { Helper } from '../page/helper'

export const AppsList: FC = () => {
  const { isMobile } = useMediaQuery()
  const { appsDataState } = useAppState()
  const { Modal, openModal, closeModal } = useModal()

  const { apps, appsSetPageNumber } = appsDataState
  const pageNumber = apps?.pageNumber ?? 1
  const totalCount = apps?.totalCount ?? 0
  const pageSize = apps?.pageSize ?? 0
  const numberPages = Math.ceil((totalCount ?? 1) / (pageSize ?? 1))
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
      <Grid className={elMb11}>
        {apps?.data?.map((app) => (
          <Col key={app.id}>
            <AppCard app={app} />
          </Col>
        ))}
      </Grid>
      {numberPages > 1 && (
        <Pagination callback={appsSetPageNumber} currentPage={pageNumber} numberPages={numberPages} />
      )}
    </>
  )
}

export default AppsList
