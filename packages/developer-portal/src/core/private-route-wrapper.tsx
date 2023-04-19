import React, { Dispatch, FC, Suspense, SetStateAction, useEffect, useState } from 'react'
import Menu from './menu'
import { Navigate, NavigateFunction, useLocation, useNavigate } from 'react-router'
import Routes from '../constants/routes'
import { ReapitConnectSession, useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../core/connect-session'
import { Loader, MainContainer } from '@reapit/elements'
import { HelperWidget, HelperWidgetApps } from '@reapit/utils-react'
import { GlobalProvider, useGlobalState } from './use-global-state'
import { openChatbot } from '../scripts/chat-bot'
import { FourOFour } from './router'
import { SendFunction, UpdateActionNames, updateActions, useReapitUpdate } from '@reapit/use-reapit-data'
import { MemberModel, UpdateMemberModel } from '@reapit/foundations-ts-definitions'
import TermsAndConditionsModal from '../components/register/terms-and-conditions-modal'
import { selectIsCustomer } from '../utils/auth'
import { DATE_TIME_FORMAT } from '@reapit/utils-common'
import dayjs from 'dayjs'

export const handleOpenChatbot = (connectSession: ReapitConnectSession | null) => () => {
  if (
    connectSession?.loginIdentity.developerId &&
    process.env.liveChatWhitelist.includes(connectSession.loginIdentity.developerId)
  ) {
    openChatbot(connectSession.loginIdentity)
  }
}

export const handleRedirectRegistraitionPage =
  (navigate: NavigateFunction, connectSession: ReapitConnectSession | null) => () => {
    const developerId = connectSession?.loginIdentity?.developerId
    const isCustomer = selectIsCustomer(connectSession)

    if (developerId || !connectSession) return

    if (!isCustomer) {
      return navigate(Routes.SELECT_ROLE)
    }

    navigate(`${Routes.CUSTOMER_REGISTER}`)
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

export const PrivateRouteWrapper: FC = ({ children }) => {
  const { connectSession, connectInternalRedirect, connectLoginRedirect } =
    useReapitConnect(reapitConnectBrowserSession)
  const location = useLocation()
  const [showTermsModal, setShowTermsModal] = useState(false)
  const { globalDataState } = useGlobalState()
  const navigate = useNavigate()

  const currentUri = `${location.pathname}${location.search}`
  const isAusUser = connectSession?.loginIdentity.orgProduct?.toLowerCase() === 'agentbox'
  const currentMember = globalDataState?.currentMember

  const [, , updateMember, updateMemberSuccess, updateMemberError] = useReapitUpdate<UpdateMemberModel, boolean>({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.updateMember],
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

  useEffect(handleRedirectRegistraitionPage(navigate, connectSession), [connectSession, history])

  useEffect(handleOpenChatbot(connectSession), [connectSession])

  if (isAusUser) {
    return <FourOFour />
  }

  if (!connectSession) {
    return (
      <MainContainer>
        <Loader fullPage />
      </MainContainer>
    )
  }

  if (connectInternalRedirect && currentUri !== connectInternalRedirect) {
    return <Navigate to={connectInternalRedirect} />
  }

  return (
    <GlobalProvider>
      <MainContainer>
        {location.pathname !== Routes.CUSTOMER_REGISTER && <Menu />}
        <Suspense fallback={<Loader fullPage />}>{children}</Suspense>
        {process.env.appEnv !== 'production' && <HelperWidget appName={HelperWidgetApps.developerPortal} />}
        <TermsAndConditionsModal visible={showTermsModal} onAccept={handleUpdateTerms(updateMember, currentMember)} />
      </MainContainer>
    </GlobalProvider>
  )
}
