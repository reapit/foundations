import Routes from '@/constants/routes'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { buildStatusToIntent, buildStatusToReadable, pipelineViewable } from '@/utils/pipeline-helpers'
import { cx } from '@linaria/core'
import { useReapitConnect } from '@reapit/connect-session'
import {
  BodyText,
  Card,
  Col,
  elFadeIn,
  elMt3,
  Grid,
  Loader,
  Pagination,
  StatusIndicator,
  Title,
} from '@reapit/elements'
import { PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import { ApiNames, GetActionNames, getActions } from '@reapit/utils-common'
import { useReapitGet } from '@reapit/utils-react'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { navigate } from '../../../utils/navigation'
import { cardCursor } from '../apps/list/__styles__'

const PipelineCard = ({ pipeline }: { pipeline: PipelineModelInterface }) => {
  const history = useHistory()

  return (
    <Card
      className={cx(elFadeIn, cardCursor)}
      onClick={navigate(history, Routes.APP_PIPELINE.replace(':appId', pipeline.appId as string))}
      hasMainCard
      mainCardHeading={
        <>
          <StatusIndicator intent={buildStatusToIntent(pipeline.buildStatus as string)} />
          {pipeline.name}
        </>
      }
      mainCardSubHeading={buildStatusToReadable(pipeline.buildStatus as string)}
      mainCardSubHeadingAdditional={pipeline.appType}
      mainCardBody={
        <>
          <BodyText>{pipeline.repository || <>&nbsp;</>}</BodyText>
          {pipelineViewable(pipeline.buildStatus as string) && (
            <BodyText>
              <a
                onClick={(e) => {
                  e.stopPropagation()
                }}
                href={`https://${pipeline.subDomain}${ApiNames(window.reapit.config.appEnv).iaas}`}
              >
                View
              </a>
            </BodyText>
          )}
        </>
      }
    />
  )
}

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

export const IaaS = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [pagination, setPagination] = useState<Pagination<PipelineModelInterface>>()
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
  useEffect(() => setPagination(pipelines || undefined), [pipelines])
  useEffect(() => refreshPagination(), [page])

  return (
    <>
      <Title>IaaS</Title>
      <BodyText>A List of results of your pipelines</BodyText>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Grid>
            {pagination?.items?.map((pipeline) => (
              <Col key={pipeline.id}>
                <PipelineCard pipeline={pipeline} />
              </Col>
            ))}
          </Grid>
          <div className={elMt3}>
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
    </>
  )
}

export default IaaS
