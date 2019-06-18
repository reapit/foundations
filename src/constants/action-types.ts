/**
 * Please follow the <<STATE>>_<<ACTION_TYPE>> pattern and group actions by STATE
 */
const ActionTypes = {
  // Home actions
  HOME_REQUEST_DATA: 'HOME_REQUEST_DATA',
  HOME_LOADING: 'HOME_LOADING',
  HOME_RECEIVE_DATA: 'HOME_RECEIVE_DATA',
  HOME_CLEAR_DATA: 'HOME_CLEAR_DATA',

  // Item actions
  ITEM_REQUEST_DATA: 'ITEM_REQUEST_DATA',
  ITEM_LOADING: 'ITEM_LOADING',
  ITEM_RECEIVE_DATA: 'ITEM_RECEIVE_DATA',
  ITEM_CLEAR_DATA: 'ITEM_CLEAR_DATA'
}

export default ActionTypes
