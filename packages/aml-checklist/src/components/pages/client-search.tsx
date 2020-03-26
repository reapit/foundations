import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router'
import {
  Button,
  Input,
  SelectBox,
  FlexContainerBasic,
  FlexContainerResponsive,
  H3,
  AcButton,
  EntityType,
  AppParams,
  Form,
  Formik,
} from '@reapit/elements'
import { LoginMode } from '@reapit/cognito-auth'
import ErrorBoundary from '@/components/hocs/error-boundary'
import Routes from '@/constants/routes'
import { SearchParams, resultSetSearchParams } from '@/actions/result'
import { ReduxState } from '../../types/core'

export interface ClientSearchMappedActions {
  setSearchParams: (params: SearchParams) => void
}

export interface ClientSearchMappedState {
  loginMode: LoginMode
}

export type ClientSearchProps = ClientSearchMappedActions & ClientSearchMappedState & RouteComponentProps

const identityCheckList = [
  { label: 'Please select…', value: '' },
  { label: 'Pass', value: 'Pass' },
  { label: 'Fail', value: 'Fail' },
  { label: 'Pending', value: 'Pending' },
  { label: 'Cancelled', value: 'Cancelled' },
  { label: 'Warnings', value: 'Warnings' },
  { label: 'Unchecked', value: 'Unchecked' },
]

export const renderForm = ({ loginMode }) => ({ values }) => {
  const disabled = !values.name && !values.address && !values.identityCheck
  return (
    <div>
      <FlexContainerResponsive hasBackground flexColumn hasPadding>
        <H3>Client Search</H3>
        <Form className="mb-8">
          <Input id="name" type="text" placeholder="Firstname or Surname" name="name" labelText="Search by name" />
          <Input
            id="address"
            type="text"
            placeholder="Streetname, Village, Town or Postcode"
            name="address"
            labelText="Search by address"
          />
          <SelectBox
            id="identityCheck"
            name="identityCheck"
            labelText="Search by ID Status"
            options={identityCheckList}
          />
          <Button className="is-right" type="submit" variant="primary" disabled={disabled}>
            Search
          </Button>
          {loginMode === 'DESKTOP' && (
            <AcButton
              dynamicLinkParams={{
                entityType: EntityType.CONTACT,
                queryParams: {
                  name: values.name,
                  address: values.address,
                  appId: window.reapit.config.appId,
                  appParam: AppParams.CONTACT_CODE,
                },
                appMode: loginMode,
              }}
              buttonProps={{
                type: 'button',
                variant: 'primary',
                disabled: !values.name && !values.address,
              }}
            >
              Advanced Search
            </AcButton>
          )}
        </Form>
      </FlexContainerResponsive>
    </div>
  )
}

export const searchContacts = ({ setSearchParams, history }) => (values: any) => {
  setSearchParams(values)
  history.push(Routes.RESULTS)
}

export const ClientSearch: React.FunctionComponent<ClientSearchProps> = ({ setSearchParams, history, loginMode }) => {
  return (
    <ErrorBoundary>
      <FlexContainerBasic hasPadding flexColumn>
        <Formik
          initialValues={{ name: '', address: '', identityCheck: '' }}
          onSubmit={searchContacts({ setSearchParams, history })}
        >
          {renderForm({ loginMode })}
        </Formik>
      </FlexContainerBasic>
    </ErrorBoundary>
  )
}

export const mapDispatchToProps = (dispatch: any): ClientSearchMappedActions => ({
  setSearchParams: (params: SearchParams) => dispatch(resultSetSearchParams(params)),
})

export const mapStateToProps = (state: ReduxState): ClientSearchMappedState => ({
  loginMode: state?.auth?.refreshSession?.mode || 'WEB',
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ClientSearch))
