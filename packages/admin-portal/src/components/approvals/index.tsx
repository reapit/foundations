import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { Pagination, Table, Button, Loader, PageContainer, Title, ButtonGroup, elMb11 } from '@reapit/elements'
import { ApprovalModel, ApprovalModelPagedResult } from '@reapit/foundations-ts-definitions'
import { AppConsents } from '../consents'
import { useReapitGet } from '@reapit/utils-react'
import { GetActionNames, getActions, toLocalTime } from '@reapit/utils-common'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { openNewPage } from '../../utils/navigation'
import AppRevisionComparison from './app-revision-comparison/app-revision-comparison'

export const handleSetConsentApproval =
  (
    setConsentApproval: Dispatch<SetStateAction<ApprovalModel | null>>,
    setDiffApproval: Dispatch<SetStateAction<ApprovalModel | null>>,
    approval: ApprovalModel | null,
  ) =>
  () => {
    if (approval) {
      setDiffApproval(null)
      setConsentApproval(approval)
    }
  }

export const handleSetDiffApproval =
  (
    setDiffApproval: Dispatch<SetStateAction<ApprovalModel | null>>,
    setConsentApproval: Dispatch<SetStateAction<ApprovalModel | null>>,
    approval: ApprovalModel | null,
  ) =>
  () => {
    if (approval) {
      setConsentApproval(null)
      setDiffApproval(approval)
    }
  }

export const AdminApprovals: FC = () => {
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [consentApproval, setConsentApproval] = useState<ApprovalModel | null>(null)
  const [diffApproval, setDiffApproval] = useState<ApprovalModel | null>(null)

  const [approvals, approvalsLoading, , refreshApprovals] = useReapitGet<ApprovalModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getApprovals],
    queryParams: { pageNumber, pageSize: 12 },
  })

  return (
    <PageContainer>
      <Title>App Revision Approvals</Title>
      {approvalsLoading ? (
        <Loader />
      ) : (
        <>
          <Table
            className={elMb11}
            rows={approvals?.data?.map((approval) => {
              const { description, created, appId, appRevisionId } = approval
              return {
                cells: [
                  {
                    label: 'Description',
                    value: description,
                    cellHasDarkText: true,
                    narrowTable: {
                      showLabel: true,
                    },
                  },
                  {
                    label: 'Created Date',
                    value: created ? toLocalTime(created) : '-',
                    narrowTable: {
                      showLabel: true,
                    },
                  },
                ],
                expandableContent: {
                  content: (
                    <>
                      <ButtonGroup alignment="center">
                        <Button
                          intent="secondary"
                          onClick={openNewPage(`${window.reapit.config.developerPortalUri}/apps/${appId}}`)}
                        >
                          View App
                        </Button>
                        <Button
                          type="button"
                          intent="primary"
                          onClick={handleSetDiffApproval(setDiffApproval, setConsentApproval, approval)}
                        >
                          View Revision
                        </Button>
                        <Button
                          intent="secondary"
                          onClick={handleSetConsentApproval(setConsentApproval, setDiffApproval, approval)}
                        >
                          View Consents
                        </Button>
                      </ButtonGroup>
                      {consentApproval && consentApproval?.appRevisionId === appRevisionId && (
                        <AppConsents approval={consentApproval} />
                      )}
                      {diffApproval && diffApproval?.appRevisionId === appRevisionId && (
                        <AppRevisionComparison approval={diffApproval} refreshApprovals={refreshApprovals} />
                      )}
                    </>
                  ),
                },
              }
            })}
          />
          <Pagination
            callback={setPageNumber}
            currentPage={pageNumber}
            numberPages={Math.ceil((approvals?.totalCount ?? 1) / 12)}
          />
        </>
      )}
    </PageContainer>
  )
}

export default AdminApprovals
