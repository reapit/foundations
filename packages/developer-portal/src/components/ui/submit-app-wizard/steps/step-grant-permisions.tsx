import React from 'react'
import { useSelector } from 'react-redux'
import { ModalBody, Button, DropdownSelect, ModalFooter, H5, SelectOption, FlexContainerBasic } from '@reapit/elements'
import { WizardStepComponent, SetWizardStep, AuthFlow } from '../types'
import { formFields } from '../form-fields'
import { useFormikContext } from 'formik'
import { ScopeModel } from '@reapit/foundations-ts-definitions'
import { ValidateFormikOnMount } from '../utils'
import authFlows from '@/constants/app-auth-flow'
import { wizzardSteps } from '../constant'
import { selectScopeList } from '@/selector/scopes/scope-list'
import { selectCreateAppLoading } from '@/selector/apps/create-app'
import { CreateAppModel } from '@reapit/foundations-ts-definitions'

const { scopesField, authFlowField } = formFields

export const onPrev = (setWizardStep: SetWizardStep, authFlow: AuthFlow) => () => {
  // flow 3: step 5 - https://github.com/reapit/foundations/issues/1785
  if (authFlow === authFlows.CLIENT_SECRET) {
    setWizardStep(wizzardSteps.INPUT_ATHENTICATION_TYPE)
    return
  }

  // flow 1 - step 6: https://github.com/reapit/foundations/issues/1799
  // flow 2 step 5: https://github.com/reapit/foundations/issues/1799
  setWizardStep(wizzardSteps.INPUT_AUTHENTICATION_URIS)
}

export const preprareScopeOptions: (scopes: ScopeModel[]) => SelectOption[] = (scopes) =>
  scopes.map((scope) => {
    const { name, description } = scope

    return {
      label: description,
      value: name,
    } as SelectOption
  })

export const StepGrantPermissions: WizardStepComponent = ({ setWizardStep }) => {
  const { values } = useFormikContext<CreateAppModel>()

  const authFlow = values[authFlowField.name] as AuthFlow

  const scopes = useSelector(selectScopeList)

  const scopeOptions = preprareScopeOptions(scopes)

  const isSubmitting = useSelector(selectCreateAppLoading)

  return (
    <>
      <ValidateFormikOnMount />
      <ModalBody
        body={
          <div>
            <H5>What type of data are you interested in?</H5>
            <p>
              Please select specific the entities you need access to on a read or write basis. You can select multiple
              options below:
            </p>
            <DropdownSelect
              mode="multiple"
              options={scopeOptions}
              name={scopesField.name}
              id={scopesField.name}
              fixedPosition
            />
          </div>
        }
      />
      <ModalFooter
        footerItems={
          <FlexContainerBasic>
            <Button
              variant="secondary"
              className="ml-0"
              disabled={isSubmitting}
              onClick={onPrev(setWizardStep, authFlow)}
            >
              Back
            </Button>
            <Button className="ml-auto" loading={isSubmitting} disabled={isSubmitting} type="submit">
              Next
            </Button>
          </FlexContainerBasic>
        }
      />
    </>
  )
}
