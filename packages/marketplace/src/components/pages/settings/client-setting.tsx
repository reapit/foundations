import * as React from 'react'
import {
  FlexContainerResponsive,
  Content,
  H3,
  FlexContainerBasic,
  GridItem,
  Grid,
  Form,
  FormHeading,
  FormSubHeading,
  Input,
  FormSection,
  Button,
  LevelRight,
  withFormik,
} from '@reapit/elements'
import { compose, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { ReduxState } from '@/types/core'
import { authLogout } from '@/actions/auth'

export type ClientSettingsPageProps = StateProps & DispatchProps

export const ClientSettingsPage: React.FC<ClientSettingsPageProps> = ({ logout }) => {
  return (
    <FlexContainerBasic flexColumn hasPadding>
      <Content>
        <FlexContainerResponsive flexColumn hasBackground hasPadding>
          <H3>Settings</H3>
          <Grid>
            <GridItem>
              <FormSection>
                <Form>
                  <FormHeading>Customer ID</FormHeading>
                  <FormSubHeading>
                    This is your Customer ID which you will need for use with Private Apps and Web Components.
                  </FormSubHeading>
                  <Grid>
                    <GridItem>
                      <Input
                        dataTest="customerId"
                        type="text"
                        labelText="Customer ID"
                        id="customerId"
                        name="customerId"
                      />
                    </GridItem>
                  </Grid>
                </Form>
              </FormSection>
            </GridItem>
            <GridItem />
          </Grid>
          <FormSection>
            <LevelRight>
              <Button dataTest="logout-btn" variant="primary" type="button" onClick={logout}>
                Logout
              </Button>
            </LevelRight>
          </FormSection>
        </FlexContainerResponsive>
      </Content>
    </FlexContainerBasic>
  )
}

export type StateProps = {
  customerId: string
}

export const mapStateToProps = (state: ReduxState): StateProps => {
  return {
    customerId: state?.auth?.loginSession?.loginIdentity?.clientId || '',
  }
}

export type DispatchProps = {
  logout: () => void
}

export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    logout: () => dispatch(authLogout()),
  }
}

export const withRedux = connect(mapStateToProps, mapDispatchToProps)

export const withCustomerIdForm = withFormik({
  enableReinitialize: true,
  displayName: 'WithCustomerIdForm',
  mapPropsToValues: (props: StateProps) => ({
    customerId: props.customerId,
  }),
  handleSubmit: () => {},
})

export const EnhanceClientSettingPage = compose<React.FC<ClientSettingsPageProps>>(
  withRedux,
  withCustomerIdForm,
)(ClientSettingsPage)
EnhanceClientSettingPage.displayName = 'EnhanceClientSettingPage'

export default EnhanceClientSettingPage as React.LazyExoticComponent<any>
