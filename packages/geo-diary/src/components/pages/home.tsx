import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router'
import { ReduxState, ExtendedAppointmentModel } from '@/types/core'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { AppointmentsState, AppointmentsTime } from '@/reducers/appointments'
import { Loader, Tabs, TabConfig, ButtonGroup, Button } from '@reapit/elements'
import { AppointmentList } from '../ui/appointment-list'
import { appointmentsRequestData, setSelectedAppointment } from '@/actions/appointments'
import AppointmentDetailModal from '@/components/common/appointment-detail'
import MapContainer from '@/components/container/map'
import containerStyle from '@/styles/pages/page-container.scss?mod'
import { NextAppointmentState } from '@/reducers/next-appointment'
import { nextAppointmentValidate } from '@/actions/next-appointment'
import { homeTabChange } from '@/actions/home'
import { setDestination } from '@/actions/direction'
import { isMobile } from '../../utils/device-detection'
import TravelMode from '../ui/travel-mode'
import { selectOnlineStatus } from '@/selectors/online'

export interface HomeMappedActions {
  requestAppointments: (time: AppointmentsTime) => void
  requestNextAppointment: (travelMode: string) => void
  setSelectedAppointment: (appointment: ExtendedAppointmentModel | null) => void
}

export interface HomeMappedProps {
  appointmentsState: AppointmentsState
  nextAppointmentState: NextAppointmentState
  currentTab: 'LIST' | 'MAP'
  desktopMode: boolean
  isOnline: boolean
}

export type HomeProps = HomeMappedActions & HomeMappedProps & RouteComponentProps<{ page?: any }>

export type TabType = 'LIST' | 'MAP'

export const changeHomeTabHandler = (changeHomeTab, tab) => () => changeHomeTab(tab)

export const tabConfigs = ({ currentTab, changeHomeTab }): TabConfig[] => [
  {
    tabIdentifier: 'LIST',
    displayText: 'List',
    onTabClick: changeHomeTabHandler(changeHomeTab, 'LIST'),
    active: currentTab === 'LIST'
  },
  {
    tabIdentifier: 'MAP',
    displayText: 'Map',
    onTabClick: changeHomeTabHandler(changeHomeTab, 'MAP'),
    active: currentTab === 'MAP'
  }
]

const filterTimes: AppointmentsTime[] = ['Today', 'Tomorrow', 'Week View']

export const handleUseEffect = ({ appointmentsState, requestNextAppointment, travelMode }) => () => {
  const hasAppointments = (appointmentsState?.appointments?._embedded || []).length > 0
  if (appointmentsState.time === 'Today' && hasAppointments && !appointmentsState.loading) {
    requestNextAppointment(travelMode)
  }
}

export const handleUseCallback = ({ setTravelMode }) => value => setTravelMode(value)

export const handleOnClickFilterTime = ({ requestAppointments, filter, time, setSelectedAppointment }) => () => {
  filter !== time && requestAppointments(filter)
  setSelectedAppointment(null)
}

export const Home: React.FunctionComponent<HomeProps> = ({
  appointmentsState,
  requestAppointments,
  requestNextAppointment,
  nextAppointmentState,
  currentTab,
  changeHomeTab,
  isOnline,
  desktopMode,
  setSelectedAppointment
}) => {
  const unfetched = !appointmentsState.appointments
  const loading = appointmentsState.loading
  const selectedAppointment = appointmentsState.selectedAppointment
  const list = appointmentsState?.appointments?._embedded || []
  const time = appointmentsState.time
  const [travelMode, setTravelMode] = React.useState<'DRIVING' | 'WALKING'>('DRIVING')
  const isMobileView = isMobile()

  React.useEffect(handleUseEffect({ appointmentsState, requestNextAppointment, travelMode }), [
    appointmentsState.appointments,
    appointmentsState.time,
    appointmentsState.loading,
    travelMode
  ])

  const handleTravelMode = React.useCallback(handleUseCallback({ setTravelMode }), [travelMode])

  return unfetched && loading ? (
    <Loader />
  ) : (
    <ErrorBoundary>
      <div
        className={`${containerStyle.controlsWrapper} ${desktopMode ? containerStyle.isDesktop : ''} ${
          isMobileView ? containerStyle.isMobile : ''
        }`}
      >
        {isMobileView && (
          <div className={containerStyle.tabsSticky}>
            <Tabs tabConfigs={tabConfigs({ currentTab, changeHomeTab })} />
          </div>
        )}

        {(currentTab === 'LIST' || !isMobileView) && (
          <>
            <div className={`${containerStyle.menuSticky} ${desktopMode ? containerStyle.isDesktop : ''}`}>
              <ButtonGroup>
                {filterTimes.map(filter => (
                  <Button
                    type="button"
                    variant="secondary"
                    className={filter === time ? `is-selected is-info` : ''}
                    key={filter}
                    onClick={handleOnClickFilterTime({ filter, requestAppointments, time, setSelectedAppointment })}
                  >
                    {filter}
                  </Button>
                ))}
              </ButtonGroup>
              <TravelMode travelMode={travelMode} onChangeTravelMode={handleTravelMode} />
            </div>

            {loading ? (
              <Loader />
            ) : (
              <AppointmentList
                appointments={list}
                appointmentTypes={appointmentsState.appointmentTypes || []}
                nextAppointment={nextAppointmentState.data}
                isOnline={isOnline}
                selectedAppointment={selectedAppointment}
                setSelectedAppointment={setSelectedAppointment}
              ></AppointmentList>
            )}
          </>
        )}
      </div>
      <div style={{ display: currentTab === 'MAP' || !isMobileView ? 'inline-block' : 'none' }}>
        <MapContainer travelMode={travelMode} />
      </div>
      <AppointmentDetailModal />
    </ErrorBoundary>
  )
}

export const mapStateToProps = (state: ReduxState): HomeMappedProps => ({
  appointmentsState: state.appointments,
  nextAppointmentState: state.nextAppointment,
  currentTab: state.home.homeTab,
  desktopMode: state?.auth?.refreshSession?.mode === 'DESKTOP',
  isOnline: selectOnlineStatus(state)
})

export interface HomeMappedActions {
  requestAppointments: (time: AppointmentsTime) => void
  changeHomeTab: (tab: 'LIST' | 'MAP') => void
}

export const mapDispatchToProps = (dispatch: any): HomeMappedActions => ({
  requestAppointments: (time: AppointmentsTime) => dispatch(appointmentsRequestData({ time })),
  requestNextAppointment: (travelMode: string) => dispatch(nextAppointmentValidate(travelMode)),
  setSelectedAppointment: (appointment: ExtendedAppointmentModel | null) => {
    dispatch(setSelectedAppointment(appointment))
    dispatch(setDestination(appointment))
    dispatch(homeTabChange('MAP'))
  },
  changeHomeTab: (tab: 'LIST' | 'MAP') => {
    dispatch(homeTabChange(tab))
    dispatch(setDestination(null))
  }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))
