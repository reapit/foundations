import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router'
import { ReduxState } from '@/types/core'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { AppointmentsState, AppointmentsTime } from '@/reducers/appointments'
import { oc } from 'ts-optchain'
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
import { AppointmentModel } from '@/types/appointments'

export interface HomeMappedActions {
  requestAppointments: (time: AppointmentsTime) => void
  requestNextAppointment: () => void
  setSelectedAppointment: (appointment: AppointmentModel | null) => void
}

export interface HomeMappedProps {
  appointmentsState: AppointmentsState
  nextAppointmentState: NextAppointmentState
  currentTab: 'LIST' | 'MAP'
  desktopMode: boolean
}

export type HomeProps = HomeMappedActions & HomeMappedProps & RouteComponentProps<{ page?: any }>

export type TabType = 'LIST' | 'MAP'

export const tabConfigs = ({ currentTab, changeHomeTab }): TabConfig[] => [
  {
    tabIdentifier: 'LIST',
    displayText: 'List',
    onTabClick: () => changeHomeTab('LIST'),
    active: currentTab === 'LIST'
  },
  {
    tabIdentifier: 'MAP',
    displayText: 'Map',
    onTabClick: () => changeHomeTab('MAP'),
    active: currentTab === 'MAP'
  }
]

const filterTimes: AppointmentsTime[] = ['Today', 'Tomorrow', 'Week View']

export const Home: React.FunctionComponent<HomeProps> = ({
  appointmentsState,
  requestAppointments,
  requestNextAppointment,
  nextAppointmentState,
  currentTab,
  changeHomeTab,
  desktopMode,
  setSelectedAppointment
}) => {
  const unfetched = !appointmentsState.appointments
  const loading = appointmentsState.loading
  const selectedAppointment = appointmentsState.selectedAppointment
  const list = oc<AppointmentsState>(appointmentsState).appointments.data([])
  const time = appointmentsState.time
  const [travelMode, setTravelMode] = React.useState<'DRIVING' | 'WALKING'>('DRIVING')
  const isMobileView = isMobile()

  React.useEffect(() => {
    const hasAppointments = oc(appointmentsState).appointments.data([]).length > 0
    if (appointmentsState.time === 'Today' && hasAppointments && !appointmentsState.loading) {
      requestNextAppointment()
    }
  }, [appointmentsState.appointments, appointmentsState.time, appointmentsState.loading])

  const handleTravelMode = React.useCallback(value => setTravelMode(value), [travelMode])

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
                    className={filter === time ? `is-selected is-primary is-active` : ''}
                    key={filter}
                    onClick={() => {
                      filter !== time && requestAppointments(filter)
                      setSelectedAppointment(null)
                    }}
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
                selectedAppointment={selectedAppointment}
                setSelectedAppointment={setSelectedAppointment}
              ></AppointmentList>
            )}
          </>
        )}
      </div>
      <div style={{ display: currentTab === 'MAP' || !isMobileView ? 'block' : 'none' }}>
        <MapContainer travelMode={travelMode} />
      </div>
      <AppointmentDetailModal />
    </ErrorBoundary>
  )
}

const mapStateToProps = (state: ReduxState): HomeMappedProps => ({
  appointmentsState: state.appointments,
  nextAppointmentState: state.nextAppointment,
  currentTab: state.home.homeTab,
  desktopMode: oc(state).auth.refreshSession.mode() === 'DESKTOP'
})

export interface HomeMappedActions {
  requestAppointments: (time: AppointmentsTime) => void
  changeHomeTab: (tab: 'LIST' | 'MAP') => void
}

const mapDispatchToProps = (dispatch: any): HomeMappedActions => ({
  requestAppointments: (time: AppointmentsTime) => dispatch(appointmentsRequestData({ time })),
  requestNextAppointment: () => dispatch(nextAppointmentValidate()),
  setSelectedAppointment: (appointment: AppointmentModel | null) => dispatch(setSelectedAppointment(appointment)),
  changeHomeTab: (tab: 'LIST' | 'MAP') => {
    dispatch(homeTabChange(tab))
    dispatch(setDestination(null))
  }
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
)
