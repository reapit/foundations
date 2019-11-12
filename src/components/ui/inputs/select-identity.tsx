import React from 'react'
import { connect } from 'react-redux'
import { SelectBox } from '@reapit/elements'
import { ReduxState } from '@/types/core'
import { IdentityTypesState } from '@/reducers/identity-types'
import { oc } from 'ts-optchain'
import { IdentityDocumentTypesModel } from '@/types/configuration-api-schema'

export type StateProps = {
  identityState?: IdentityTypesState
}

export type SelectIdentityProps = { labelText: string; name: string; id: string } & StateProps

export const generateListIdentity = (identityTypes: IdentityDocumentTypesModel[]) => () => {
  return identityTypes
    .filter(item => item.id)
    .map(item => ({
      label: item.value as string,
      value: item.id as string
    }))
}

export const SelectIdentity: React.FC<SelectIdentityProps> = ({ identityState, ...props }) => {
  const identityTypes = oc(identityState).identityTypes([])

  const listIdentity = React.useMemo(generateListIdentity(identityTypes), [identityTypes])
  return <SelectBox {...props} options={listIdentity} />
}

export const mapStateToProps = (state: ReduxState): StateProps => ({
  identityState: state.identityTypes
})

export default connect(
  mapStateToProps,
  null
)(SelectIdentity)
