import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router'
import { ReduxState } from '@/types/core'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { AppointmentsState, AppointmentsTime } from '@/reducers/appointments'
import { oc } from 'ts-optchain'
import { Loader, Tabs, TabConfig } from '@reapit/elements'
import { AppointmentList } from '../ui/appointment-list'
import { appointmentsRequestData } from '@/actions/appointments'
import AppointmentDetailModal from '@/components/common/appointment-detail'
import bulma from '@/styles/vendor/bulma'
import MapContainer from '@/components/container/map'
import containerStyle from '@/styles/pages/page-container.scss?mod'
import { NextAppointmentState } from '@/reducers/next-appointment'
import { nextAppointmentValidate } from '@/actions/next-appointment'
import { homeTabChange } from '@/actions/home'
import { setDestination } from '@/actions/direction'

export interface HomeMappedActions {
  requestAppointments: (time: AppointmentsTime) => void
  requestNextAppointment: () => void
}

export interface HomeMappedProps {
  appointmentsState: AppointmentsState
  nextAppointmentState: NextAppointmentState
  currentTab: 'LIST' | 'MAP'
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

const filterTimes: AppointmentsTime[] = ['Today', 'Tomorrow', 'Next week']

export const Home: React.FunctionComponent<HomeProps> = ({
  appointmentsState,
  requestAppointments,
  requestNextAppointment,
  nextAppointmentState,
  currentTab,
  changeHomeTab
}) => {
  const unfetched = !appointmentsState.appointments
  const loading = appointmentsState.loading
  const list = oc<AppointmentsState>(appointmentsState).appointments.data.data([])
  const time = appointmentsState.time

  React.useEffect(() => {
    const hasAppointments = oc(appointmentsState).appointments.data.data([]).length > 0
    if (appointmentsState.time === 'Today' && hasAppointments && !appointmentsState.loading) {
      requestNextAppointment()
    }
  }, [appointmentsState.appointments, appointmentsState.time, appointmentsState.loading])

  if (unfetched && loading) {
    return <Loader />
  }

  const uncancelledList = list.filter(({ cancelled }) => !cancelled)
  return (
    <ErrorBoundary>
      <div className={containerStyle.tabsSticky}>
        <Tabs tabConfigs={tabConfigs({ currentTab, changeHomeTab })} />
      </div>

      {currentTab === 'LIST' && (
        <>
          <div className={`${bulma.isCentered} ${bulma.buttons} ${bulma.hasAddons}`}>
            {filterTimes.map(filter => (
              <span
                className={
                  bulma.button + (filter === time ? ` ${bulma.isSelected} ${bulma.isActive} ${bulma.isPrimary}` : '')
                }
                key={filter}
                onClick={() => filter !== time && requestAppointments(filter)}
              >
                {filter}
              </span>
            ))}
          </div>

          {loading ? (
            <Loader />
          ) : (
            <AppointmentList data={uncancelledList} nextAppointment={nextAppointmentState.data}></AppointmentList>
          )}
        </>
      )}
      <div style={{ display: currentTab === 'MAP' ? 'block' : 'none' }}>
        <MapContainer />
      </div>
      <AppointmentDetailModal />
    </ErrorBoundary>
  )
}

const mapStateToProps = (state: ReduxState): HomeMappedProps => ({
  appointmentsState: state.appointments,
  nextAppointmentState: state.nextAppointment,
  currentTab: state.home.homeTab
})

export interface HomeMappedActions {
  requestAppointments: (time: AppointmentsTime) => void
  changeHomeTab: (tab: 'LIST' | 'MAP') => void
}

const mapDispatchToProps = (dispatch: any): HomeMappedActions => ({
  requestAppointments: (time: AppointmentsTime) => dispatch(appointmentsRequestData({ time })),
  requestNextAppointment: () => dispatch(nextAppointmentValidate()),
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
