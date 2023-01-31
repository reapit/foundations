import { reapitConnectBrowserSession } from '../../core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import {
  BodyText,
  Button,
  ButtonGroup,
  elMb11,
  FormLayout,
  InputWrap,
  Loader,
  PageContainer,
  Pagination,
  SearchableDropdown,
  StatusIndicator,
  Table,
  Title,
  useModal,
} from '@reapit/elements'
import { PipelineModelInterface, pipelineNotDeletable } from '@reapit/foundations-ts-definitions'
import { buildStatusToIntent, buildStatusToReadable } from '@reapit/utils-common'
import {
  objectToQuery,
  SendFunction,
  useReapitGet,
  useReapitUpdate,
  GetActionNames,
  getActions,
  UpdateActionNames,
  updateActions,
} from '@reapit/use-reapit-data'
import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import { usePermissionsState } from '../../core/use-permissions-state'
import { fetchDevelopersList } from '../../services/developers'

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

export type IaasFilterValues = {
  developerId?: string
}

export const handleDeletePipeline =
  (deletePipeline: SendFunction<void, boolean>, closeModal: () => void, refreshPipelines: () => void) => () => {
    const handleDelete = async () => {
      const response = await deletePipeline()
      if (response) {
        closeModal()
        refreshPipelines()
      }
    }

    handleDelete()
  }

export const handleOpenModal =
  (setAppId: Dispatch<SetStateAction<string | null>>, openModal: () => void, appId?: string) => async () => {
    if (appId) {
      setAppId(appId)
      openModal()
    }
  }

export const IaaS: FC = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [page, setPage] = useState<number>(1)
  const [iaasFilters, setIaasFilters] = useState<IaasFilterValues>({})
  const [appId, setAppId] = useState<string | null>(null)
  const { Modal, openModal, closeModal } = useModal()
  const { hasReadAccess } = usePermissionsState()

  const queryParams = objectToQuery(iaasFilters)

  const [pipelines, pipelinesLoading, , refreshPipelines] = useReapitGet<Pagination<PipelineModelInterface>>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.paginatePipeline],
    headers: {
      Authorization: connectSession?.idToken as string,
    },
    fetchWhenTrue: [connectSession?.idToken],
    queryParams: {
      ...queryParams,
      page,
    },
  })

  const [, , deletePipeline] = useReapitUpdate<void, boolean>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.deletePipeline],
    method: 'DELETE',
    uriParams: {
      appId,
    },
    headers: {
      Authorization: connectSession?.idToken as string,
    },
  })

  const { register, handleSubmit } = useForm<IaasFilterValues>({
    mode: 'onChange',
  })

  return (
    <PageContainer>
      <Title>IaaS Pipelines</Title>
      <form onChange={handleSubmit(setIaasFilters)}>
        <FormLayout className={elMb11}>
          <InputWrap>
            <SearchableDropdown
              id="developer-search-box"
              {...register('developerId')}
              getResults={(company: string) =>
                fetchDevelopersList({ company }).then((developers) => developers?.data ?? [])
              }
              getResultLabel={(result) => `${result.company} -  ${result.name}`}
              getResultValue={(result) => result.id ?? ''}
              placeholder="Search developer organisations"
            />
          </InputWrap>
        </FormLayout>
      </form>
      {pipelinesLoading ? (
        <Loader />
      ) : (
        <>
          <Table
            className={elMb11}
            numberColumns={4}
            rows={pipelines?.items.map(({ name, id, buildStatus, repository }) => ({
              cells: [
                {
                  label: 'Name',
                  value: name,
                  icon: 'apiInfographic',
                  cellHasDarkText: true,
                  narrowTable: {
                    showLabel: true,
                  },
                },
                {
                  label: 'Build Status',
                  value: (
                    <>
                      <StatusIndicator intent={buildStatusToIntent(buildStatus as string)} />
                      {buildStatusToReadable(buildStatus as string)}
                    </>
                  ),
                  narrowTable: {
                    showLabel: true,
                  },
                },
                {
                  label: 'Repository',
                  value: repository,
                  narrowTable: {
                    showLabel: true,
                  },
                },
              ],
              ctaContent: {
                headerContent: 'Delete Pipeline',
                icon: pipelineNotDeletable.includes(buildStatus as string) || hasReadAccess ? undefined : 'trashSystem',
                onClick:
                  pipelineNotDeletable.includes(buildStatus as string) || hasReadAccess
                    ? undefined
                    : handleOpenModal(setAppId, openModal, id),
              },
            }))}
          />
          <Modal title="Delete Pipeline">
            <BodyText hasGreyText>
              Are you sure you want to delete this pipeline? This will tear down any infrastructure you have provisioned
              and cannot be recovered.
            </BodyText>
            <ButtonGroup alignment="center">
              <Button fixedWidth intent="low" onClick={closeModal}>
                Close
              </Button>
              <Button
                fixedWidth
                intent="danger"
                onClick={handleDeletePipeline(deletePipeline, closeModal, refreshPipelines)}
              >
                Delete
              </Button>
            </ButtonGroup>
          </Modal>
          {pipelines && (
            <Pagination
              currentPage={pipelines.meta.currentPage ?? 1}
              numberPages={pipelines.meta.totalPages ?? 1}
              callback={setPage}
            />
          )}
        </>
      )}
    </PageContainer>
  )
}

export default IaaS
