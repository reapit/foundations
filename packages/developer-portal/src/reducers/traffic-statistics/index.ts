import { combineReducers } from 'redux'
import trafficStatisticsReducer, { TrafficStatisticsState } from './list'

export type TrafficStatisticsRootState = {
  list: TrafficStatisticsState
}
export default combineReducers<TrafficStatisticsRootState>({
  list: trafficStatisticsReducer,
})
