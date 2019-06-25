import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { ReduxState } from '../../types/core'
import { ItemState } from '../../reducers/item'
import { itemClearData, itemRequestData } from '../../actions/item'
import Routes from '../../constants/routes'
import Loader from '../ui/loader'
import ErrorBoundary from '../hocs/error-boundary'

export interface ItemMappedActions {
  itemClearData: () => void
  itemRequestData: () => void
}

export interface ItemMappedProps {
  itemState: ItemState
}
export type ItemProps = ItemMappedActions & ItemMappedProps

export const Item: React.FunctionComponent<ItemProps> = ({ itemClearData, itemRequestData, itemState }) => (
  <div className="container">
    <h1 className="h1">Node JS</h1>
    <ul className="nav">
      <li className="nav-item">
        <a className="nav-link" onClick={itemClearData}>
          Clear All
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" onClick={itemRequestData}>
          Fetch All
        </a>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to={Routes.HOME}>
          Home Page
        </Link>
      </li>
    </ul>
    {itemState.loading ? (
      <Loader />
    ) : (
      <ErrorBoundary>
        <div className="list-group">
          {itemState.itemData &&
            itemState.itemData.data.children.map(child => (
              <div key={child.data.id}>
                <a className="list-group-item list-group-item-action" target="_blank" href={child.data.url}>
                  {child.data.title}
                </a>
              </div>
            ))}
        </div>
      </ErrorBoundary>
    )}
  </div>
)

const mapStateToProps = (state: ReduxState): ItemMappedProps => ({
  itemState: state.item
})

const mapDispatchToProps = (dispatch: any): ItemMappedActions => ({
  itemClearData: () => dispatch(itemClearData(null)),
  itemRequestData: () => dispatch(itemRequestData())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Item)
