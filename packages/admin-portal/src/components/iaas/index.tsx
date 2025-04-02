import { reapitConnectBrowserSession } from '../../core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import {
  BodyText,
  Button,
  ButtonGroup,
  elMb11,
  elMb12,
  FormLayout,
  InputWrap,
  Label,
  Loader,
  PageContainer,
  Pagination,
  SearchableDropdown,
  StatusIndicator,
  Subtitle,
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
import { cx } from '@linaria/core'

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

  // TODO: remove union type when foundations-ts-definitions has been updated
  const [pipelines, pipelinesLoading, , refreshPipelines] = useReapitGet<
    Pagination<PipelineModelInterface >
  >({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.paginatePipeline],
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
    action: updateActions[UpdateActionNames.deletePipeline],
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

  const subDomainUrl = (subDomain?: string): string => {
    if (subDomain)
      return `https://${subDomain}${process.env.NODE_ENV === 'development' ? '.dev.paas' : ''}.reapit.cloud`

    return ''
  }

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
            rows={pipelines?.items.map(
              ({
                name,
                id,
                buildStatus,
                repository,
                appId,
                branch,
                subDomain,
                developerId,
                certificateStatus,
                outDir,
                customDomain,
                packageManager,
                verifyDnsName,
                verifyDnsValue,
                buildCommand,
                cloudFrontId,
                certificateArn,
              }) => ({
                cells: [
                  {
                    label: 'Name',
                    value: name,
                    icon: 'insights',
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
                    value: repository?.repositoryUrl,
                    narrowTable: {
                      showLabel: true,
                    },
                  },
                ],
                expandableContent: {
                  content: (
                    <>
                      <BodyText hasBoldText>Pipeline</BodyText>
                      <FormLayout className={cx(elMb12)}>
                        <InputWrap>
                          <Label>Pipeline Name</Label>
                          <BodyText>{name}</BodyText>
                        </InputWrap>
                        <InputWrap>
                          <Label>Pipeline Id</Label>
                          <BodyText>{id}</BodyText>
                        </InputWrap>
                        <InputWrap>
                          <Label>App Id</Label>
                          <BodyText>{appId}</BodyText>
                        </InputWrap>
                        <InputWrap>
                          <Label>Developer Id</Label>
                          <BodyText>{developerId}</BodyText>
                        </InputWrap>
                        <InputWrap>
                          <Label>Build Status</Label>
                          <BodyText>{buildStatus}</BodyText>
                        </InputWrap>
                      </FormLayout>
                      <BodyText hasBoldText>Repository</BodyText>
                      <FormLayout className={cx(elMb12)}>
                        <InputWrap>
                          <Label>Repository Url</Label>
                          <BodyText>{repository?.repositoryUrl}</BodyText>
                        </InputWrap>
                        <InputWrap>
                          <Label>Repository Id</Label>
                          <BodyText>{repository?.repositoryId}</BodyText>
                        </InputWrap>
                        <InputWrap>
                          <Label>Repo Installation Id</Label>
                          <BodyText>{repository?.installationId}</BodyText>
                        </InputWrap>
                        <InputWrap>
                          <Label>Branch</Label>
                          <BodyText>{branch}</BodyText>
                        </InputWrap>
                        <InputWrap>
                          <Label>Out Dir</Label>
                          <BodyText>{outDir}</BodyText>
                        </InputWrap>
                        <InputWrap>
                          <Label>Package Manager</Label>
                          <BodyText>{packageManager}</BodyText>
                        </InputWrap>
                        <InputWrap>
                          <Label>Build Command</Label>
                          <BodyText>{buildCommand}</BodyText>
                        </InputWrap>
                      </FormLayout>
                      <BodyText hasBoldText>Domain</BodyText>
                      <FormLayout className={cx(elMb12)}>
                        <InputWrap>
                          <Label>Sub Domain</Label>
                          <BodyText>{subDomain}</BodyText>
                        </InputWrap>
                        <InputWrap>
                          <Label>Sub Domain Url</Label>
                          <BodyText>{subDomainUrl(subDomain)}</BodyText>
                        </InputWrap>
                        <InputWrap>
                          <Label>Custom Domain</Label>
                          <BodyText>{customDomain}</BodyText>
                        </InputWrap>
                        <InputWrap>
                          <Label>Certificate Status</Label>
                          <BodyText>{certificateStatus}</BodyText>
                        </InputWrap>
                        <InputWrap>
                          <Label>Verify DNS TXT Record Name Prefix</Label>
                          <BodyText>{verifyDnsName}</BodyText>
                        </InputWrap>
                        <InputWrap>
                          <Label>Verify DNS TXT Record Value</Label>
                          <BodyText>{verifyDnsValue}</BodyText>
                        </InputWrap>
                        <InputWrap>
                          <Label>CloudFrontId</Label>
                          <BodyText>{cloudFrontId}</BodyText>
                        </InputWrap>
                        <InputWrap>
                          <Label>CertificateArn</Label>
                          <BodyText>{certificateArn}</BodyText>
                        </InputWrap>
                      </FormLayout>
                      <BodyText hasBoldText>Actions</BodyText>
                      <ButtonGroup>
                        <Button
                          intent="danger"
                          onClick={
                            pipelineNotDeletable.includes(buildStatus as string) || hasReadAccess
                              ? undefined
                              : handleOpenModal(setAppId, openModal, id)
                          }
                        >
                          Delete Pipeline
                        </Button>
                      </ButtonGroup>
                    </>
                  ),
                },
              }),
            )}
          />
          <Modal title="Delete Pipeline">
            <BodyText hasGreyText>
              Are you sure you want to delete this pipeline? This will tear down any infrastructure you have provisioned
              and cannot be recovered.
            </BodyText>
            <ButtonGroup alignment="right">
              <Button onClick={closeModal}>Close</Button>
              <Button intent="danger" onClick={handleDeletePipeline(deletePipeline, closeModal, refreshPipelines)}>
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
