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
import { ReduxState } from '@/types/core'
import clientSearchValidationSchema from './form-schema/validation-schema'
import formFields from './form-schema/form-fields'

export interface ClientSearchMappedActions {
  setSearchParams: (params: SearchParams) => void
}

export interface ClientSearchMappedState {
  loginMode: LoginMode
}

export type ClientSearchProps = ClientSearchMappedActions & ClientSearchMappedState & RouteComponentProps

const { nameField, addressField, identityCheckField } = formFields

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
  return (
    <div>
      <FlexContainerResponsive hasBackground flexColumn hasPadding>
        <H3>Client Search</H3>
        <Form className="mb-8">
          <Input
            id={nameField.name}
            type="text"
            placeholder={nameField.placeHolder}
            name={nameField.name}
            labelText={nameField.label}
          />
          <Input
            id={addressField.name}
            type="text"
            placeholder={addressField.placeHolder}
            name={addressField.name}
            labelText={addressField.label}
          />
          <SelectBox
            id={identityCheckField.name}
            name={identityCheckField.name}
            labelText={identityCheckField.label}
            options={identityCheckList}
          />
          <Button className="is-right" type="submit" variant="primary">
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
          initialValues={{ [nameField.name]: '', [addressField.name]: '', [identityCheckField.name]: '' }}
          onSubmit={searchContacts({ setSearchParams, history })}
          validationSchema={clientSearchValidationSchema}
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
