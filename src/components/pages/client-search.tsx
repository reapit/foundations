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
  LoginMode,
  AppParams
} from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { Formik, Form } from 'formik'
import Routes from '@/constants/routes'
import { SearchParams, resultSetSearchParams } from '@/actions/result'
import { ReduxState } from '../../types/core'
import { oc } from 'ts-optchain'

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
  { label: 'Unchecked', value: 'Unchecked' }
]

export const ClientSearch: React.FunctionComponent<ClientSearchProps> = ({ setSearchParams, history, loginMode }) => {
  const searchContacts = value => {
    setSearchParams(value)
    history.push(Routes.RESULTS)
  }

  return (
    <ErrorBoundary>
      <FlexContainerBasic hasPadding flexColumn>
        <Formik
          initialValues={{ name: '', address: '', identityCheck: '' }}
          onSubmit={values => searchContacts(values)}
          render={({ values }) => {
            const disabled = !values.name && !values.address && !values.identityCheck
            return (
              <div>
                <FlexContainerResponsive hasBackground flexColumn hasPadding>
                  <H3>Client Search</H3>
                  <Form className="mb-8">
                    <Input
                      id="name"
                      type="text"
                      placeholder="Firstname or Surname"
                      name="name"
                      labelText="Search by name"
                    />
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
                            name: values.name ? values.name : '',
                            address: values.address ? values.address : '',
                            // TODO - this should be dynamic - is the hardcoded AML dev id
                            appId: '77f7c64f-0214-49eb-8963-f0b98f747072',
                            appParam: AppParams.CONTACT_CODE
                          },
                          appMode: loginMode
                        }}
                        buttonProps={{
                          type: 'button',
                          variant: 'primary',
                          disabled: !values.name && !values.address
                        }}
                      >
                        Advanced Search
                      </AcButton>
                    )}
                  </Form>
                </FlexContainerResponsive>
              </div>
            )
          }}
        />
      </FlexContainerBasic>
    </ErrorBoundary>
  )
}

const mapDispatchToProps = (dispatch: any): ClientSearchMappedActions => ({
  setSearchParams: (params: SearchParams) => dispatch(resultSetSearchParams(params))
})

const mapStateToProps = (state: ReduxState): ClientSearchMappedState => ({
  loginMode: oc(state).auth.refreshSession.mode('WEB')
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ClientSearch)
)
