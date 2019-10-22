import React from 'react'
import { connect } from 'react-redux'
import { SelectBox } from '@reapit/elements'
import { ReduxState } from '@/types/core'
import { IdentityTypesState } from '@/reducers/identity-types'
import { oc } from 'ts-optchain'

export type StateProps = {
  identityState?: IdentityTypesState
}

export type SelectIdentityProps = { labelText: string; name: string; id: string } & StateProps

export const SelectIdentity: React.FC<SelectIdentityProps> = ({ identityState, ...props }) => {
  const identityTypes = oc(identityState).identityTypes([])

  const listIdentity = React.useMemo(() => {
    if (identityTypes) {
      return identityTypes.map(item => ({
        label: item.value || '',
        value: item.id || ''
      }))
    }
    return []
  }, [identityTypes])

  return <SelectBox {...props} options={listIdentity} />
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  identityState: state.identityTypes
})

export default connect(
  mapStateToProps,
  null
)(SelectIdentity)
