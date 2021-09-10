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
  PaginationWrap,
  PaginationText,
  PaginationButton,
  elPaginationPrimary,
  elFlexGrow,
  StatusIndicator,
  PersistantNotification,
  elMb8,
} from '@reapit/elements'
import { PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { pipelineServicePaginate } from '../../../platform-api/pipelines'
import { Pagination } from 'nestjs-typeorm-paginate'
import { cx } from '@linaria/core'
import { pipelineStatusToIntent } from './../../../utils'

export default () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [pipelinePagination, setPipelinePagination] = useState<Pagination<PipelineModelInterface>>()
  const [loading, setLoading] = useState<boolean>(false)

  const history = useHistory()

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
        <Icon className={elMb5} icon="apiDocsInfographic" iconSize="large" />
        <Subtitle>Pipeline Manager</Subtitle>
        <BodyText hasGreyText>
          Here you can monitor your created pipelines and see progress against deployments in live time. For more
          information read the documentation below:
        </BodyText>
        <Button className={elMb5} intent="neutral">
          View Docs
        </Button>
        <Button className={elMb5} intent="critical" onClick={() => history.push(Routes.PIPELINES_CREATION)}>
          New Pipeline
        </Button>
      </SecondaryNavContainer>
      <PageContainer className={elHFull}>
        <div>
          <FlexContainer isFlexAlignCenter isFlexJustifyCenter>
            {loading ? (
              <Loader label="Loading" fullPage />
            ) : pipelinePagination ? (
              <section className={cx(elFlexGrow)}>
                <Title>My Pipelines</Title>
                <Table
                  className={elMb8}
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
                        label: 'Domain',
                        value: pipeline.subDomain as string,
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
                {pipelinePagination.items.length ? (
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
                ) : (
                  <PersistantNotification intent="secondary" isExpanded isInline isFullWidth>
                    No pipelines retrieved. You will need to create a new pipeline from the left hand side menu.
                  </PersistantNotification>
                )}
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
