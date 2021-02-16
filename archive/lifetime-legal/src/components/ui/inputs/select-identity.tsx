import React from 'react'
import { connect } from 'react-redux'
import { SelectBox } from '@reapit/elements'
import { ReduxState } from '@/types/core'
import { IdentityTypesState } from '@/reducers/identity-types'

export type StateProps = {
  identityState?: IdentityTypesState
}

export type SelectIdentityProps = { labelText: string; name: string; id: string } & StateProps

export const SelectIdentity: React.FC<SelectIdentityProps> = ({ identityState, ...props }: SelectIdentityProps) => {
  const identityTypes = identityState?.identityTypes || []

  const listIdentity = React.useMemo(() => {
    if (identityTypes) {
      return identityTypes
        .filter(item => item.id)
        .map(item => ({
          label: item.value || '',
          value: item.id || '',
        }))
    }
    return []
  }, [identityTypes])

  return <SelectBox {...props} options={listIdentity} />
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  identityState: state.identityTypes,
})

export default connect(mapStateToProps, null)(SelectIdentity)
