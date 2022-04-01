import { reapitConnectBrowserSession } from '@/core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import {
  BodyText,
  Button,
  elMt6,
  Icon,
  Loader,
  PageContainer,
  Pagination,
  SecondaryNavContainer,
  Table,
  TableHeader,
  TableHeadersRow,
  Title,
} from '@reapit/elements'
import { PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { useReapitGet } from '@reapit/utils-react'
import React, { FC, useEffect, useState } from 'react'
import { PipelineRow } from './pipeline-row'

type Pagination<T> = {
  items: Array<T>
  meta: {
    currentPage: number
    itemCount: number
    itemsPerPage: number
    totalItems: number
    totalPages: number
  }
}

export const IaaS: FC = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [pagination, setPagination] = useState<Pagination<PipelineModelInterface> | null>()
  const [page, setPage] = useState<number>(1)

  const [pipelines, loading, , refreshPagination] = useReapitGet<Pagination<PipelineModelInterface>>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.paginatePipeline],
    headers: {
      Authorization: connectSession?.idToken as string,
    },
    fetchWhenTrue: [connectSession?.idToken],
    queryParams: {
      page,
    },
  })
  useEffect(() => setPagination(pipelines), [pipelines])
  useEffect(() => refreshPagination(), [page])

  return (
    <>
      <SecondaryNavContainer>
        <Title>IaaS</Title>
        <Icon iconSize="large" icon={'refreshInfographic'} />
        <BodyText>
          Infrastructure as a Service management. Pipelines are for deploying your Reapit apps to our infrastructure to
          simplify your development process
        </BodyText>
        <Button intent="critical">View Docs</Button>
      </SecondaryNavContainer>
      <PageContainer>
        <Title>Pipelines</Title>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Table data-has-expandable-action data-num-columns-excl-action-col="3">
              <TableHeadersRow>
                <TableHeader>Name</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Repository</TableHeader>
                <TableHeader></TableHeader>
              </TableHeadersRow>
              {pagination?.items?.map((pipeline) => (
                <PipelineRow pipeline={pipeline} key={pipeline.id} />
              ))}
            </Table>
            <div className={elMt6}>
              {pagination && (
                <Pagination
                  currentPage={pagination.meta.currentPage}
                  numberPages={pagination.meta.totalPages}
                  callback={(page) => {
                    setPage(page)
                  }}
                />
              )}
            </div>
          </>
        )}
      </PageContainer>
    </>
  )
}

export default IaaS
