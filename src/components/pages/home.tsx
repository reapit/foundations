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
import CurrentLocButton from '../container/current-loc-button'
import MapContainer from '@/components/container/map'
import containerStyle from '@/styles/pages/page-container.scss?mod'

export interface HomeMappedActions {
  requestAppointments: (time: AppointmentsTime) => void
}

export interface HomeMappedProps {
  appointmentsState: AppointmentsState
}

export type HomeProps = HomeMappedActions & HomeMappedProps & RouteComponentProps<{ page?: any }>

export type TabType = 'LIST' | 'MAP'

export const tabConfigs = ({ currentTab, setCurrentTab }): TabConfig[] => [
  {
    tabIdentifier: 'LIST',
    displayText: 'List',
    onTabClick: () => setCurrentTab('LIST'),
    active: currentTab === 'LIST'
  },
  {
    tabIdentifier: 'MAP',
    displayText: 'Map',
    onTabClick: () => setCurrentTab('MAP'),
    active: currentTab === 'MAP'
  }
]

const filterTimes: AppointmentsTime[] = ['Today', 'Tomorrow', 'Next week']

export const Home: React.FunctionComponent<HomeProps> = ({ appointmentsState, requestAppointments }) => {
  const unfetched = !appointmentsState.appointments
  const loading = appointmentsState.loading
  const list = oc<AppointmentsState>(appointmentsState).appointments.data.data([])
  const [currentTab, setCurrentTab] = React.useState<TabType>('LIST')
  const time = appointmentsState.time

  if (unfetched && loading) {
    return <Loader />
  }

  const uncancelledList = list.filter(({ cancelled }) => !cancelled)

  return (
    <ErrorBoundary>
      <div className={containerStyle.tabsSticky}>
        <Tabs tabConfigs={tabConfigs({ currentTab, setCurrentTab })} />
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

          {loading ? <Loader /> : <AppointmentList data={uncancelledList}></AppointmentList>}
        </>
      )}

      {currentTab === 'MAP' && (
        <div>
          <MapContainer appointments={[]} />
        </div>
      )}
      <AppointmentDetailModal />
    </ErrorBoundary>
  )
}

const mapStateToProps = (state: ReduxState): HomeMappedProps => ({
  appointmentsState: state.appointments
})

const mapDispatchToProps = (dispatch: any): HomeMappedActions => ({
  requestAppointments: (time: AppointmentsTime) => dispatch(appointmentsRequestData({ time }))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
)
