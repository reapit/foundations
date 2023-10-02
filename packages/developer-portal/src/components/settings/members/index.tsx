import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import {
  Button,
  ButtonGroup,
  elMb11,
  Icon,
  Loader,
  MobileControls,
  Pagination,
  StatusIndicator,
  Table,
  Title,
  useMediaQuery,
  useModal,
} from '@reapit/elements'
import { useReapitGet } from '@reapit/use-reapit-data'
import { MemberModelPagedResult } from '@reapit/foundations-ts-definitions'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { GetActionNames, getActions } from '@reapit/use-reapit-data'
import { useReapitConnect } from '@reapit/connect-session'
import { MemberUpdateControls } from './member-update-controls'
import { useGlobalState } from '../../../core/use-global-state'
import { Controls } from '../page/controls'

export const getIntentFromStatus = (status: string) => {
  return status === 'active'
    ? 'success'
    : status === 'rejected'
    ? 'danger'
    : status === 'pending'
    ? 'pending'
    : 'default'
}

export const handleRefreshMembers =
  (
    membersShouldRefresh: boolean,
    setMembersShouldRefresh: Dispatch<SetStateAction<boolean>>,
    refreshMembers: () => void,
  ) =>
  () => {
    if (membersShouldRefresh) {
      refreshMembers()
      setMembersShouldRefresh(false)
    }
  }

export const SettingsMembersPage: FC = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { globalRefreshState } = useGlobalState()
  const { isMobile } = useMediaQuery()
  const { Modal, openModal, closeModal } = useModal()
  const {
    members: [membersShouldRefresh, setMembersShouldRefresh],
  } = globalRefreshState
  const [pageNumber, setPageNumber] = useState<number>(1)
  const developerId = connectSession?.loginIdentity.developerId

  const [members, membersLoading, , refreshMembers] = useReapitGet<MemberModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getDeveloperMembers],
    queryParams: { pageSize: 12, pageNumber },
    uriParams: { developerId },
    fetchWhenTrue: [developerId],
  })

  useEffect(handleRefreshMembers(membersShouldRefresh, setMembersShouldRefresh, refreshMembers), [membersShouldRefresh])

  return (
    <>
      <Title>Members</Title>
      {isMobile && (
        <Modal title="Controls">
          <Controls />
          <ButtonGroup alignment="right">
            <Button intent="neutral" onClick={closeModal}>
              Close
            </Button>
          </ButtonGroup>
        </Modal>
      )}
      {membersLoading && <Loader />}
      <Table
        className={elMb11}
        rows={members?.data?.map((member) => ({
          cells: [
            {
              label: 'Name',
              value: member.name ?? '',
              icon: 'usernameSystem',
              cellHasDarkText: true,
              narrowTable: {
                showLabel: true,
              },
            },
            {
              label: 'Status',
              value: '',
              children: (
                <>
                  <StatusIndicator intent={getIntentFromStatus(member.status ?? '')} />{' '}
                  {`${(member.status ?? '').charAt(0).toUpperCase()}${(member.status ?? '').slice(1).toLowerCase()}`}
                </>
              ),
              narrowTable: {
                showLabel: true,
              },
            },
            {
              label: 'Email',
              value: member.email ?? '',
              icon: 'emailSystem',
              cellHasDarkText: true,
              narrowTable: {
                showLabel: true,
              },
            },
            {
              label: 'Role',
              value: member.role ? `${member.role.charAt(0).toUpperCase()}${member.role.slice(1).toLowerCase()}` : '',
              cellHasDarkText: true,
              narrowTable: {
                showLabel: true,
              },
            },
            {
              label: 'Main Contact',
              value: member.isMainContact ? <Icon icon="checkSolidSystem" intent="success" /> : '-',
              narrowTable: {
                showLabel: true,
              },
            },
          ],
          expandableContent: {
            content: <MemberUpdateControls member={member} refreshMembers={refreshMembers} />,
          },
        }))}
      />
      <Pagination
        callback={setPageNumber}
        currentPage={pageNumber}
        numberPages={Math.ceil((members?.totalCount ?? 1) / (members?.pageSize ?? 1))}
      />
      <MobileControls onClick={openModal} />
    </>
  )
}

export default SettingsMembersPage
