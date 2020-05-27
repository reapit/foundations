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
  Formik,
} from '@reapit/elements'
import { Dispatch } from 'redux'
import { useSelector, useDispatch } from 'react-redux'
import { authLogout } from '@/actions/auth'
import { selectClientId } from '@/selector/auth'

export const handleLogout = (dispatch: Dispatch) => () => {
  dispatch(authLogout())
}

export const ClientSettingsPage: React.FC = () => {
  const dispatch = useDispatch()
  const customerId = useSelector(selectClientId)
  const initialValues = {
    customerId,
  }

  const logout = handleLogout(dispatch)
  return (
    <FlexContainerBasic flexColumn hasPadding>
      <Content>
        <FlexContainerResponsive flexColumn hasBackground hasPadding>
          <H3>Settings</H3>
          <Grid>
            <GridItem>
              <FormSection>
                <Formik enableReinitialize initialValues={initialValues} onSubmit={() => {}}>
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
                </Formik>
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

export default ClientSettingsPage as React.LazyExoticComponent<any>
