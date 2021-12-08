import React from 'react'
import { FormSection, H5, FormSubHeading, Button, LevelRight, Grid, GridItem } from '@reapit/elements-legacy'
import { MemberModel, SandboxModelPagedResult } from '@reapit/foundations-ts-definitions'
import { updateCurrentMember } from '@/actions/current-member'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentMemberData, selectCurrentMemberIsUpdating } from '@/selector/current-member'
import FadeIn from '../../../../styles/fade-in'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import { selectIsUserOrUserAdmin, selectLoginIdentity } from '../../../../selector/auth'
import { ElToggleItem, Label, Toggle, ToggleRadio, ToggleRadioOption, InputGroup } from '@reapit/elements'
import { useReapitGet } from '@reapit/utils-react'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { useForm } from 'react-hook-form'

export type ToggleCustomerDataValues = {
  useCustomerData: boolean
  sandboxId: string
}

export type ToggleCustomerDataFormProps = {}

export const generateInitialValues = ({
  currentMemberInfo,
}: {
  currentMemberInfo: MemberModel | null
}): ToggleCustomerDataValues => {
  return {
    useCustomerData: currentMemberInfo?.useCustomerData ?? false,
    sandboxId: currentMemberInfo?.sandboxId ?? 'GBR',
  }
}

export const ToggleCustomerDataForm: React.FC<ToggleCustomerDataFormProps> = () => {
  const currentMemberInfo = useSelector(selectCurrentMemberData)
  const isUpdating = useSelector(selectCurrentMemberIsUpdating)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { clientId, orgName } = selectLoginIdentity(connectSession)
  const isUserOrUserAdmin = selectIsUserOrUserAdmin(connectSession)
  const dispatch = useDispatch()
  const updateCurrentMemberInformation = (values: ToggleCustomerDataValues) => dispatch(updateCurrentMember(values))
  const defaultValues = generateInitialValues({ currentMemberInfo })
  const [sandboxes] = useReapitGet<SandboxModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getSandboxes],
  })
  const { register, handleSubmit } = useForm<ToggleCustomerDataValues>({
    defaultValues,
  })

  if (!clientId || !isUserOrUserAdmin || !sandboxes?.data) return null

  return (
    <form onSubmit={handleSubmit(handleSubmitToggleCustomerData(updateCurrentMemberInformation))}>
      <FormSection>
        <FadeIn>
          <H5>Customer Data</H5>
          <FormSubHeading>
            As your account is associated with both the Sandbox Data (SBOX) and Customer Data, you can choose to toggle
            between which data you want to see available in the Developer Portal. You can also choose which sandbox you
            wish to view based on your Reapit Product. This is specific and only associated to your developer profile.
            Please note, you will need to log out and log back in again to see this change take effect.
          </FormSubHeading>
          <Grid>
            <GridItem>
              <InputGroup>
                <Toggle id="useCustomerData" hasGreyBg {...register('useCustomerData')}>
                  <ElToggleItem>Customer</ElToggleItem>
                  <ElToggleItem>Sandbox</ElToggleItem>
                </Toggle>
                <Label>Use {orgName} Customer or Sandbox data</Label>
              </InputGroup>
            </GridItem>
            <GridItem>
              <InputGroup>
                <ToggleRadio
                  hasGreyBg
                  {...register('sandboxId')}
                  options={
                    sandboxes?.data?.map((sandbox) => ({
                      id: sandbox.id ?? '',
                      text: sandbox.name ?? '',
                      value: sandbox.id ?? '',
                      isChecked: defaultValues.sandboxId === sandbox.id,
                    })) as ToggleRadioOption[]
                  }
                />
                <Label>Choose Sandbox</Label>
              </InputGroup>
            </GridItem>
          </Grid>
          <LevelRight>
            <Button dataTest="save-changes" loading={isUpdating} variant="primary" type="submit">
              Save Changes
            </Button>
          </LevelRight>
        </FadeIn>
      </FormSection>
    </form>
  )
}

export const handleSubmitToggleCustomerData =
  (updateCurrentMemberInformation: (values: ToggleCustomerDataValues) => void) =>
  (values: ToggleCustomerDataValues) => {
    updateCurrentMemberInformation(values)
  }

export default ToggleCustomerDataForm
