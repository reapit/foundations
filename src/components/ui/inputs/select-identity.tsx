import React from 'react'
import { connect } from 'react-redux'
import { SelectBox } from '@reapit/elements'
import { ReduxState } from '@/types/core'
import { IdentityTypesState } from '@/reducers/identity-types'
import { ListItemModel } from '@reapit/types'

export type StateProps = {
  identityState?: IdentityTypesState
}

export type SelectIdentityProps = { labelText: string; name: string; id: string } & StateProps

export const generateListIdentity = (identityTypes: ListItemModel[]) => () => {
  return identityTypes
    .filter(item => item.id)
    .map(item => ({
      label: item.value as string,
      value: item.id as string
    }))
}

export const SelectIdentity: React.FC<SelectIdentityProps> = ({ identityState, ...props }) => {
  const identityTypes = identityState?.identityTypes || []

  const listIdentity = React.useMemo(generateListIdentity(identityTypes), [identityTypes])
  return <SelectBox {...props} options={listIdentity} required />
}

export const mapStateToProps = (state: ReduxState): StateProps => ({
  identityState: state.identityTypes
})

export default connect(mapStateToProps, null)(SelectIdentity)
