import Routes from '@/constants/routes'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { ReapitConnectSession, useReapitConnect } from '@reapit/connect-session'
import {
  BodyText,
  Button,
  Table,
  Icon,
  Loader,
  PageContainer,
  SecondaryNavContainer,
  Subtitle,
  Title,
  elHFull,
  elMb5,
  FlexContainer,
  SecondaryNav,
  SecondaryNavItem,
  elMb8,
  PaginationWrap,
  PaginationText,
  PaginationButton,
  elPaginationPrimary,
  elFlexGrow,
  StatusIndicator,
} from '@reapit/elements'
import { PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { pipelineServicePaginate } from '../../../platform-api/pipelines'
import { Pagination } from 'nestjs-typeorm-paginate'
import { cx } from '@linaria/core'
import { pipelineStatusToIntent } from './../../../utils'

export default () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [pipelinePagination, setPipelinePagination] = useState<Pagination<PipelineModelInterface>>()
  const [loading, setLoading] = useState<boolean>(false)

  const history = useHistory()
  const location = useLocation()
  const { pathname } = location

  const fetchPipelines = async (page?: number) => {
    setLoading(true)
    const serviceResponse = await pipelineServicePaginate(connectSession as ReapitConnectSession, page)
    setLoading(false)
    if (serviceResponse) {
      setPipelinePagination(serviceResponse)
    }

    // TODO add page to location as query
  }

  useEffect(() => {
    if (connectSession) {
      fetchPipelines()
    }
  }, [connectSession])

  return (
    <FlexContainer isFlexAuto>
      <SecondaryNavContainer>
        <Title>Pipelines</Title>
        <Icon className={elMb5} icon="developersMenu" iconSize="large" />
        <Subtitle>Deployment pipeline manager</Subtitle>
        <BodyText hasGreyText>description about the pipeline service</BodyText>
        <SecondaryNav className={elMb8}>
          <SecondaryNavItem onClick={() => history.push(Routes.PIPELINES)} active={pathname === Routes.PIPELINES}>
            My Pipelines
          </SecondaryNavItem>
          <SecondaryNavItem
            onClick={() => history.push(Routes.PIPELINES_CREATION)}
            active={pathname === Routes.PIPELINES_CREATION}
          >
            Create new Pipeline
          </SecondaryNavItem>
        </SecondaryNav>
      </SecondaryNavContainer>
      <PageContainer className={elHFull}>
        <div>
          <FlexContainer isFlexAlignCenter isFlexJustifyCenter>
            {loading ? (
              <Loader />
            ) : pipelinePagination ? (
              <section className={cx(elFlexGrow)}>
                <Title>My Pipelines</Title>
                <Table
                  rows={pipelinePagination.items.map((pipeline) => ({
                    cells: [
                      {
                        label: 'Status',
                        value: pipeline.buildStatus as string,
                        children: (
                          <>
                            <StatusIndicator
                              intent={pipelineStatusToIntent(pipeline.buildStatus || 'AWAITING DEPLOYMENT')}
                            />
                            {pipeline.buildStatus}
                          </>
                        ),
                      },
                      {
                        label: 'Name',
                        value: pipeline.name as string,
                      },
                      {
                        label: 'repository',
                        value: pipeline.repository as string,
                      },
                      {
                        label: '',
                        value: '',
                        children: (
                          <Button
                            intent="secondary"
                            onClick={() => {
                              history.push(Routes.PIPELINES_SHOW.replace(':pipelineId', pipeline.id as string))
                            }}
                          >
                            Manage
                          </Button>
                        ),
                      },
                    ],
                  }))}
                />
                <PaginationWrap>
                  <PaginationText>
                    <strong>{pipelinePagination.meta.currentPage}</strong> of {pipelinePagination?.meta.totalPages}
                  </PaginationText>
                  <PaginationButton
                    onClick={async () => {
                      if (pipelinePagination.meta.currentPage <= 1) {
                        return
                      }
                      await fetchPipelines(pipelinePagination.meta.currentPage - 1)
                    }}
                  >
                    <Icon icon="backSystem" />
                  </PaginationButton>
                  <PaginationButton
                    onClick={async () => {
                      if (pipelinePagination.meta.currentPage >= pipelinePagination.meta.totalPages) {
                        return
                      }
                      await fetchPipelines(pipelinePagination.meta.currentPage + 1)
                    }}
                  >
                    <Icon icon="nextSystem" className={elPaginationPrimary} />
                  </PaginationButton>
                </PaginationWrap>
              </section>
            ) : (
              <Title>Something went wrong</Title>
            )}
          </FlexContainer>
        </div>
      </PageContainer>
    </FlexContainer>
  )
}
