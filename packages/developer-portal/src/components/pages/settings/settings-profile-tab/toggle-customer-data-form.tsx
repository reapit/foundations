import React from 'react'
import {
  FormSection,
  FormHeading,
  FormSubHeading,
  Button,
  Form,
  LevelRight,
  Grid,
  GridItem,
  Formik,
  Checkbox,
} from '@reapit/elements'
import { MemberModel } from '@reapit/foundations-ts-definitions'
import { updateCurrentMember } from '@/actions/current-member'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentMemberData, selectCurrentMemberIsUpdating } from '@/selector/current-member'
import FadeIn from '../../../../styles/fade-in'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import { selectIsUserOrUserAdmin, selectLoginIdentity } from '../../../../selector/auth'

export type ToggleCustomerDataValues = {
  useCustomerData: boolean
}

export type ToggleCustomerDataFormProps = {}

export const defaultInitialValues: ToggleCustomerDataValues = {
  useCustomerData: false,
}

export const generateInitialValues = ({
  defaultInitialValues,
  currentMemberInfo,
}: {
  defaultInitialValues: ToggleCustomerDataValues
  currentMemberInfo: MemberModel | null
}): ToggleCustomerDataValues => {
  if (!currentMemberInfo) {
    return defaultInitialValues
  }

  const { useCustomerData = false } = currentMemberInfo

  return {
    useCustomerData,
  }
}

export const ToggleCustomerDataForm: React.FC<ToggleCustomerDataFormProps> = () => {
  const currentMemberInfo = useSelector(selectCurrentMemberData)
  const isUpdating = useSelector(selectCurrentMemberIsUpdating)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { clientId, orgName } = selectLoginIdentity(connectSession)
  const isUserOrUserAdmin = selectIsUserOrUserAdmin(connectSession)
  const dispatch = useDispatch()
  const updateCurrentMemberInformation = values => dispatch(updateCurrentMember(values))
  const initialValues = generateInitialValues({ defaultInitialValues, currentMemberInfo })

  if (!clientId || !isUserOrUserAdmin) return null

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmitToggleCustomerData(updateCurrentMemberInformation)}>
      {() => {
        return (
          <FormSection>
            <Form>
              <FadeIn>
                <FormHeading>Customer Data</FormHeading>
                <FormSubHeading>
                  As your account is associated with both the Sandbox Data (SBOX) and Customer Data, you can choose to
                  toggle between which data you want to see available in the Developer Portal. This is specific and only
                  associated to your developer profile. Please note, you will need to log out and log back in again to
                  see this change take effect.
                </FormSubHeading>
                <Grid>
                  <GridItem>
                    <Checkbox
                      dataTest="useCustomerData"
                      labelText={`Use ${orgName} data`}
                      id="useCustomerData"
                      name="useCustomerData"
                    />
                  </GridItem>
                </Grid>
                <LevelRight>
                  <Button dataTest="save-changes" loading={isUpdating} variant="primary" type="submit">
                    Save Changes
                  </Button>
                </LevelRight>
              </FadeIn>
            </Form>
          </FormSection>
        )
      }}
    </Formik>
  )
}

export const handleSubmitToggleCustomerData = (
  updateCurrentMemberInformation: (values: ToggleCustomerDataValues) => void,
) => (values: ToggleCustomerDataValues) => {
  updateCurrentMemberInformation(values)
}

export default ToggleCustomerDataForm
