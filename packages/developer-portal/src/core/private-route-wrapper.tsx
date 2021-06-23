import React, { useEffect, useState } from 'react'
import Menu from '@/components/ui/menu'
import {
  Section,
  FlexContainerResponsive,
  AppNavContainer,
  FlexContainerBasic,
  DATE_TIME_FORMAT,
} from '@reapit/elements-legacy'
import { Redirect, useLocation } from 'react-router'
import Routes from '@/constants/routes'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { getCookieString, COOKIE_DEVELOPER_FIRST_TIME_LOGIN_COMPLETE } from '@/utils/cookie'
import { useDispatch, useSelector } from 'react-redux'
import TermsAndConditionsModal from '../components/ui/terms-and-conditions-modal'
import { fetchCurrentMember, updateCurrentMember } from '../actions/current-member'
import dayjs from 'dayjs'
import {
  selectCurrentMemberData,
  selectCurrentMemberIsLoading,
  selectCurrentMemberUpdateState,
} from '../selector/current-member'
import { Dispatch } from 'redux'
import { ELEMENTS_V3_PAGES } from '../constants/pages'
import { Loader } from '@reapit/elements'

const { Suspense } = React

export type PrivateRouteWrapperProps = {
  children?: React.ReactNode
  path: string
  showMenu?: boolean
}

export const handleUpdateTerms = (dispatch: Dispatch) => () => {
  dispatch(
    updateCurrentMember({
      agreedTerms: dayjs().format(DATE_TIME_FORMAT.RFC3339),
    }),
  )
}

export const PrivateRouteWrapper: React.FunctionComponent<PrivateRouteWrapperProps> = ({
  children,
  showMenu = true,
}) => {
  if (window.location.pathname === '/') {
    return <Redirect to={Routes.LOGIN} />
  }

  const { connectSession, connectLoginRedirect, connectInternalRedirect } = useReapitConnect(
    reapitConnectBrowserSession,
  )
  const [showTermsModal, setShowTermsModal] = useState(false)
  const location = useLocation()
  const dispatch = useDispatch()
  const currentMember = useSelector(selectCurrentMemberData)
  const currentMemberLoading = useSelector(selectCurrentMemberIsLoading)
  const memberUpdateState = useSelector(selectCurrentMemberUpdateState)
  const currentUri = `${location.pathname}${location.search}`
  const isV3Page = ELEMENTS_V3_PAGES.includes(location.pathname)

  useEffect(() => {
    if (showTermsModal && memberUpdateState === 'SUCCESS') {
      setShowTermsModal(false)
    }

    if (showTermsModal && memberUpdateState === 'FAILED') {
      connectLoginRedirect()
    }
  }, [memberUpdateState, showTermsModal, setShowTermsModal, connectLoginRedirect])

  useEffect(() => {
    if (connectSession && connectSession.loginIdentity && connectSession.loginIdentity.developerId) {
      if ((!currentMember || !currentMember.id) && !currentMemberLoading) {
        dispatch(fetchCurrentMember())
      }

      if (currentMember && currentMember.id && !currentMember.agreedTerms) {
        setShowTermsModal(true)
      }

      if (
        currentMember &&
        currentMember.id &&
        currentMember.agreedTerms &&
        dayjs(currentMember.agreedTerms).isBefore(dayjs('2021-06-18'))
      ) {
        setShowTermsModal(true)
      }
    }
  }, [connectSession, currentMember, setShowTermsModal, dispatch])

  const updateTerms = handleUpdateTerms(dispatch)

  if (!connectSession) {
    return (
      <AppNavContainer>
        <FlexContainerBasic hasBackground>
          <Loader label="Loading" fullPage />
        </FlexContainerBasic>
      </AppNavContainer>
    )
  }

  if (connectInternalRedirect && currentUri !== connectInternalRedirect) {
    return <Redirect to={connectInternalRedirect} />
  }

  const hasReadWelcome = Boolean(getCookieString(COOKIE_DEVELOPER_FIRST_TIME_LOGIN_COMPLETE))
  if (!hasReadWelcome && location.pathname === Routes.APPS) {
    return <Redirect to={Routes.WELCOME} />
  }

  return (
    <AppNavContainer>
      {showMenu && <Menu />}
      {isV3Page ? (
        <FlexContainerBasic flexColumn isScrollable hasPadding hasBackground>
          <Suspense
            fallback={
              <Section>
                <Loader label="Loading" fullPage />
              </Section>
            }
          >
            {children}
          </Suspense>
          <TermsAndConditionsModal visible={showTermsModal} onAccept={updateTerms} tapOutsideToDissmiss={false} />
        </FlexContainerBasic>
      ) : (
        <FlexContainerBasic flexColumn isScrollable>
          <FlexContainerResponsive
            hasPadding
            flexColumn
            // I want to allow scrolling beyond the end of the page to allow for the toast notification
            // except on the Gitbook page because the iframe handles it's own scrolling
            isPageContainer={location.pathname !== Routes.API_DOCS}
          >
            <Suspense
              fallback={
                <Section>
                  <Loader label="Loading" fullPage />
                </Section>
              }
            >
              {children}
            </Suspense>
            <TermsAndConditionsModal visible={showTermsModal} onAccept={updateTerms} tapOutsideToDissmiss={false} />
          </FlexContainerResponsive>
        </FlexContainerBasic>
      )}
    </AppNavContainer>
  )
}

export default PrivateRouteWrapper
