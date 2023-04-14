import React, { useEffect, LazyExoticComponent, FC, useState, Dispatch, SetStateAction } from 'react'
import { History } from 'history'
import { Route, RouteProps, useHistory } from 'react-router'
import Routes from '../constants/routes'
import { useReapitConnect, ReapitConnectSession } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../core/connect-session'
import { selectIsCustomer } from '../utils/auth'
import TermsAndConditionsModal from '../components/register/terms-and-conditions-modal'
import { useGlobalState } from './use-global-state'
import { SendFunction, useReapitUpdate } from '@reapit/utils-react'
import { MemberModel, UpdateMemberModel } from '@reapit/foundations-ts-definitions'
import { DATE_TIME_FORMAT, UpdateActionNames, updateActions } from '@reapit/utils-common'
import dayjs from 'dayjs'

export interface PrivateRouteProps {
  component: FC | LazyExoticComponent<any>
  exact?: boolean
}

export const handleRedirectRegistraitionPage =
  (history: History, connectSession: ReapitConnectSession | null) => () => {
    const developerId = connectSession?.loginIdentity?.developerId
    const isCustomer = selectIsCustomer(connectSession)

    if (developerId || !connectSession) return

    if (!isCustomer) {
      return history.push(Routes.SELECT_ROLE)
    }

    history.push(`${Routes.CUSTOMER_REGISTER}`)
  }

export const handleUpdateTerms =
  (updateMember: SendFunction<UpdateMemberModel, boolean>, currentMember: MemberModel | null) => () => {
    if (!currentMember) return
    updateMember({
      ...currentMember,
      agreedTerms: dayjs().format(DATE_TIME_FORMAT.RFC3339),
    })
  }

export const handleMemberUpdate =
  (currentMember: MemberModel | null, showTermsModal: boolean, setShowTermsModal: Dispatch<SetStateAction<boolean>>) =>
  () => {
    if (showTermsModal || !currentMember) return
    if (!currentMember.agreedTerms || dayjs(currentMember.agreedTerms).isBefore(dayjs('2021-06-18'))) {
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

export const PrivateRoute = ({ component, ...rest }: PrivateRouteProps & RouteProps) => {
  const history = useHistory()
  const { globalDataState } = useGlobalState()
  const { currentMember } = globalDataState
  const [showTermsModal, setShowTermsModal] = useState(false)
  const { connectSession, connectLoginRedirect } = useReapitConnect(reapitConnectBrowserSession)

  const [, , updateMember, updateMemberSuccess, updateMemberError] = useReapitUpdate<UpdateMemberModel, boolean>({
    reapitConnectBrowserSession,
    action: updateActions(process.env.appEnv)[UpdateActionNames.updateMember],
    method: 'PUT',
    uriParams: {
      developerId: currentMember?.developerId,
      memberId: currentMember?.id,
    },
  })

  useEffect(handleMemberUpdate(currentMember, showTermsModal, setShowTermsModal), [currentMember])

  useEffect(handleMemberUpdated(connectLoginRedirect, setShowTermsModal, updateMemberError, updateMemberSuccess), [
    updateMemberSuccess,
    updateMemberError,
  ])

  useEffect(handleRedirectRegistraitionPage(history, connectSession), [connectSession, history])

  return (
    <>
      <Route
        {...rest}
        render={() => {
          const Component = component

          return <Component />
        }}
      />
      <TermsAndConditionsModal visible={showTermsModal} onAccept={handleUpdateTerms(updateMember, currentMember)} />
    </>
  )
}

export default PrivateRoute
