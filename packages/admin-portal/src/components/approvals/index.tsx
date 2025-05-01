import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { Pagination, Table, Button, Loader, PageContainer, Title, ButtonGroup, elMb11 } from '@reapit/elements'
import { Marketplace } from '@reapit/foundations-ts-definitions'
import { AppConsents } from '../consents'
import { useReapitGet, GetActionNames, getActions } from '@reapit/use-reapit-data'
import { toLocalTime } from '@reapit/utils-common'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { openNewPage } from '../../utils/navigation'
import AppRevisionComparison from './app-revision-comparison'
import { usePermissionsState } from '../../core/use-permissions-state'

export const handleSetConsentApproval =
  (
    setConsentApproval: Dispatch<SetStateAction<Marketplace.ApprovalModel | null>>,
    setDiffApproval: Dispatch<SetStateAction<Marketplace.ApprovalModel | null>>,
    approval: Marketplace.ApprovalModel | null,
  ) =>
  () => {
    if (approval) {
      setDiffApproval(null)
      setConsentApproval(approval)
    }
  }

export const handleSetDiffApproval =
  (
    setDiffApproval: Dispatch<SetStateAction<Marketplace.ApprovalModel | null>>,
    setConsentApproval: Dispatch<SetStateAction<Marketplace.ApprovalModel | null>>,
    approval: Marketplace.ApprovalModel | null,
  ) =>
  () => {
    if (approval) {
      setConsentApproval(null)
      setDiffApproval(approval)
    }
  }

export const AdminApprovals: FC = () => {
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [consentApproval, setConsentApproval] = useState<Marketplace.ApprovalModel | null>(null)
  const [diffApproval, setDiffApproval] = useState<Marketplace.ApprovalModel | null>(null)
  const { hasReadAccess } = usePermissionsState()

  const [approvals, approvalsLoading, , refreshApprovals] = useReapitGet<Marketplace.ApprovalModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getApprovals],
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
              const { description, created, appId, appRevisionId, createdBy } = approval
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
                    label: 'Created By',
                    value: createdBy,
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
                        <Button intent="default" onClick={openNewPage(`${process.env.appMarketUri}/apps/${appId}`)}>
                          View in AppMarket
                        </Button>
                        <Button
                          intent="default"
                          disabled={hasReadAccess}
                          onClick={openNewPage(`${process.env.developerPortalUri}/apps/${appId}`)}
                        >
                          View in DevPortal
                        </Button>
                        <Button
                          type="button"
                          intent="default"
                          onClick={handleSetDiffApproval(setDiffApproval, setConsentApproval, approval)}
                        >
                          View Revision
                        </Button>
                        <Button
                          intent="default"
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
