import { reapitConnectBrowserSession } from '@/core/connect-session'
import { PusherProvider } from '@harelpls/use-pusher'
import { useReapitConnect } from '@reapit/connect-session'
import {
  SmallText,
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
  elMb5,
} from '@reapit/elements'
import { PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { useReapitGet } from '@reapit/utils-react'
import React, { FC, useEffect, useState } from 'react'
import { COGNITO_HEADERS, URLS } from '../../constants/api'
import ErrorBoundary from '../../core/error-boundary'
import { useGlobalState } from '../../core/use-global-state'
import { ExternalPages, openNewPage } from '../../utils/navigation'
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
  const { globalDataState } = useGlobalState()
  const { currentDeveloper } = globalDataState

  const [pipelines, loading] = useReapitGet<Pagination<PipelineModelInterface>>({
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

  if (!connectSession) return null

  return (
    <>
      <SecondaryNavContainer>
        <Title>IaaS</Title>
        <Icon className={elMb5} iconSize="large" icon="webDeveloperInfographic" />
        <SmallText hasGreyText>
          Infrastructure as a Service management. Pipelines are for deploying your Reapit apps to our infrastructure to
          simplify your development process
        </SmallText>
        <Button intent="neutral" onClick={openNewPage(ExternalPages.pipelineDocs)}>
          View Docs
        </Button>
      </SecondaryNavContainer>
      <PageContainer>
        <ErrorBoundary>
          <PusherProvider
            cluster="eu"
            clientKey={window.reapit.config.PUSHER_KEY}
            authEndpoint={`${URLS.DEPLOYMENT_SERVICE_HOST}pusher/auth`}
            auth={{
              headers: {
                ...COGNITO_HEADERS,
                Authorization: connectSession.idToken,
              },
            }}
          >
            <Title>Pipelines</Title>
            {loading || !currentDeveloper ? (
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
                    <PipelineRow connectSession={connectSession} pipeline={pipeline} key={pipeline.id} />
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
          </PusherProvider>
        </ErrorBoundary>
      </PageContainer>
    </>
  )
}

export default IaaS
