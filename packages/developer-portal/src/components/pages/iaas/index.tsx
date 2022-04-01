import Routes from '@/constants/routes'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { buildStatusToIntent, buildStatusToReadable, pipelineViewable } from '@/utils/pipeline-helpers'
import { useReapitConnect } from '@reapit/connect-session'
import {
  BodyText,
  Button,
  ButtonGroup,
  elMt6,
  Loader,
  Pagination,
  StatusIndicator,
  Table,
  TableCell,
  TableExpandableRow,
  TableExpandableRowTriggerCell,
  TableHeader,
  TableHeadersRow,
  TableRow,
  TableRowContainer,
  Title,
} from '@reapit/elements'
import { PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import { ApiNames, GetActionNames, getActions } from '@reapit/utils-common'
import { useReapitGet } from '@reapit/utils-react'
import React, { FC, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { navigate, openNewPage } from '../../../utils/navigation'

const PipelineRow: FC<{ pipeline: PipelineModelInterface }> = ({ pipeline }) => {
  const history = useHistory()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <TableRowContainer>
      <TableRow>
        <TableCell>{pipeline.name}</TableCell>
        <TableCell>
          <StatusIndicator intent={buildStatusToIntent(pipeline.buildStatus as string)} />
          {buildStatusToReadable(pipeline.buildStatus as string)}
        </TableCell>
        <TableCell>{pipeline.appType}</TableCell>
        <TableCell>
          <a target="_blank" href={pipeline.repository} rel="noreferrer">
            {pipeline.repository}
          </a>
        </TableCell>
        <TableExpandableRowTriggerCell
          isOpen={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        ></TableExpandableRowTriggerCell>
      </TableRow>
      <TableExpandableRow isOpen={isOpen}>
        <ButtonGroup>
          <Button
            intent="secondary"
            onClick={navigate(history, Routes.APP_PIPELINE.replace(':appId', pipeline.appId as string))}
          >
            Manage
          </Button>
          {pipelineViewable(pipeline.buildStatus as string) && (
            <Button
              intent="primary"
              onClick={openNewPage(`https://${pipeline.subDomain}${ApiNames(window.reapit.config.appEnv).iaas}`)}
            >
              View
            </Button>
          )}
        </ButtonGroup>
      </TableExpandableRow>
    </TableRowContainer>
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

export const IaaS: FC = () => {
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
          <Table>
            <TableHeadersRow>
              <TableHeader>Name</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>App Type</TableHeader>
              <TableHeader>Repository</TableHeader>
              <TableHeader>Actions</TableHeader>
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
    </>
  )
}

export default IaaS
