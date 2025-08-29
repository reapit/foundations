import { Marketplace } from '@reapit/foundations-ts-definitions'
import React, { FC, useState, Dispatch, SetStateAction, PropsWithChildren, useEffect } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { SendFunction, UpdateActionNames, updateActions, useReapitUpdate } from '@reapit/use-reapit-data'
import { reapitConnectBrowserSession } from './connect-session'
import TermsAndConditionsModal from '../components/register/terms-and-conditions-modal'
import { DATE_TIME_FORMAT } from '@reapit/utils-common'
import dayjs from 'dayjs'
import { useGlobalState } from './use-global-state'

export const handleUpdateTerms =
  (updateMember: SendFunction<Marketplace.UpdateMemberModel, boolean>, currentMember: Marketplace.MemberModel | null) =>
  () => {
    if (!currentMember) return
    updateMember({
      ...currentMember,
      agreedTerms: dayjs().format(DATE_TIME_FORMAT.RFC3339),
    })
  }

export const handleMemberUpdate =
  (
    currentMember: Marketplace.MemberModel | null,
    showTermsModal: boolean,
    setShowTermsModal: Dispatch<SetStateAction<boolean>>,
  ) =>
  () => {
    if (showTermsModal || !currentMember) return
    if (!currentMember.agreedTerms || dayjs(currentMember.agreedTerms).isBefore(dayjs('2025-09-01'))) {
      setShowTermsModal(true)
    }
  }

export const handleMemberUpdated =
  (
    connectLoginRedirect: () => void,
    setShowTermsModal: Dispatch<SetStateAction<boolean>>,
    updateMemberError: string | null,
    updateMemberSuccess?: boolean,
  ) =>
  () => {
    if (updateMemberError) {
      connectLoginRedirect()
    }

    if (updateMemberSuccess) {
      setShowTermsModal(false)
    }
  }

export const TAndCsHoc: FC<PropsWithChildren> = ({ children }) => {
  const [showTermsModal, setShowTermsModal] = useState(false)
  const { connectLoginRedirect } = useReapitConnect(reapitConnectBrowserSession)
  const { globalDataState } = useGlobalState()
  const currentMember = globalDataState?.currentMember

  const [, , updateMember, updateMemberSuccess, updateMemberError] = useReapitUpdate<
    Marketplace.UpdateMemberModel,
    boolean
  >({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.updateMember],
    method: 'PUT',
    uriParams: {
      developerId: currentMember?.developerId,
      memberId: currentMember?.id,
    },
  })

  useEffect(handleMemberUpdated(connectLoginRedirect, setShowTermsModal, updateMemberError, updateMemberSuccess), [
    updateMemberSuccess,
    updateMemberError,
  ])

  useEffect(handleMemberUpdate(currentMember, showTermsModal, setShowTermsModal), [currentMember])

  return (
    <>
      {children}
      <TermsAndConditionsModal visible={showTermsModal} onAccept={handleUpdateTerms(updateMember, currentMember)} />
    </>
  )
}
