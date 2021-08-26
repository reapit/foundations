import Routes from '@/constants/routes'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { ReapitConnectSession, useReapitConnect } from '@reapit/connect-session'
import { notification } from '@reapit/elements-legacy'
import { Button, Table } from '@reapit/elements-legacy'
import {
  BodyText,
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
} from '@reapit/elements'
import { PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import React, { useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { pipelineServiceDelete, pipelineServicePaginate } from '../../../platform-api/pipelines'
import { Pagination } from 'nestjs-typeorm-paginate'
import { cx } from '@linaria/core'

export default () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [pipelines, setPipelines] = useState<Pagination<PipelineModelInterface>>()
  const [loading, setLoading] = useState<boolean>(false)
  const [deletionLoading, setDeletionLoading] = useState<string[]>([])

  const history = useHistory()
  const location = useLocation()
  const { pathname } = location

  const fetchPipelines = async (page?: number) => {
    setLoading(true)
    const serviceResponse = await pipelineServicePaginate(connectSession as ReapitConnectSession, page)
    setLoading(false)
    if (serviceResponse) {
      setPipelines(serviceResponse)
    }
  }

  useEffect(() => {
    if (connectSession) {
      fetchPipelines()
    }
  }, [connectSession])

  const deletePipeline = async (id: string) => {
    if (!pipelines) {
      return
    }

    setDeletionLoading([...deletionLoading, id])

    await pipelineServiceDelete(connectSession as ReapitConnectSession, id)

    setDeletionLoading(deletionLoading.filter((del) => del !== id))
    setPipelines({
      ...pipelines,
      items: pipelines.items.filter((pipeline) => pipeline.id !== id),
    })
    notification.success({ message: 'Pipeline deleted' })
  }

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
            ) : pipelines ? (
              <section className={cx(elFlexGrow)}>
                <Title>My Pipelines</Title>
                <Table
                  data={pipelines.items}
                  columns={[
                    {
                      Header: 'Name',
                      accessor: 'name',
                    },
                    {
                      Header: 'Repository',
                      accessor: 'repository',
                    },
                    {
                      id: 'Delete',
                      Cell: ({ row }: { row: { original: any } }) => (
                        <>
                          <Button variant="secondary">
                            <Link to={Routes.PIPELINES_SHOW.replace(':pipelineId', row.original.id)}>Manage</Link>
                          </Button>
                          <Button
                            loading={deletionLoading.includes(row.original.id)}
                            onClick={() => deletePipeline(row.original.id)}
                            variant="danger"
                          >
                            Delete
                          </Button>
                        </>
                      ),
                    },
                  ]}
                />
                <PaginationWrap>
                  <PaginationText>
                    <strong>{pipelines.meta.currentPage}</strong> of {pipelines?.meta.totalPages}
                  </PaginationText>
                  <PaginationButton
                    onClick={async () => {
                      if (pipelines.meta.currentPage <= 1) {
                        return
                      }
                      await fetchPipelines(pipelines.meta.currentPage - 1)
                    }}
                  >
                    <Icon icon="backSystem" />
                  </PaginationButton>
                  <PaginationButton
                    onClick={async () => {
                      if (pipelines.meta.currentPage >= pipelines.meta.totalPages) {
                        return
                      }
                      await fetchPipelines(pipelines.meta.currentPage + 1)
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
