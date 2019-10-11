import React from 'react'
import { connect } from 'react-redux'
import { SelectBox } from '@reapit/elements'
import { ReduxState } from '@/types/core'
import { Dispatch } from 'redux'
import { identityTypesRequestData } from '@/actions/identity-types'
import { IdentityTypesState } from '@/reducers/identity-types'

export interface SelectIdentityMappedActions {
  fetchIdentityTypes: () => void
}

export interface SelectIdentityMappedProps {
  identityState: IdentityTypesState
}

export type SelectIdentityProps = { labelText: string; name: string; id: string } & SelectIdentityMappedProps &
  SelectIdentityMappedActions

export const SelectIdentity: React.FC<SelectIdentityProps> = ({ identityState, fetchIdentityTypes, ...props }) => {
  const { identityTypes } = identityState

  React.useEffect(() => {
    if (!identityTypes) {
      fetchIdentityTypes()
    }
  }, [])

  const listIdentity = React.useMemo(() => {
    if (identityTypes) {
      return identityTypes
        .filter(item => item.id)
        .map(item => ({
          label: item.value as string,
          value: item.id as string
        }))
    }
    return []
  }, [identityTypes])

  return <SelectBox {...props} options={listIdentity} />
}

const mapStateToProps = (state: ReduxState): SelectIdentityMappedProps => ({
  identityState: state.identityTypes
})

const mapDispatchToProps = (dispatch: Dispatch): SelectIdentityMappedActions => ({
  fetchIdentityTypes: () => dispatch(identityTypesRequestData())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectIdentity)
