import React from 'react'
import AuthFlow from '@/constants/app-auth-flow'
import AppAuthenticationDetail from '@/components/ui/app-authentication-detail'
import { CustomCreateAppModel } from '@/actions/submit-app'
import { ModalBody, Button, ModalFooter, H5 } from '@reapit/elements'
import { WizardStepComponent } from '../types'
import { useFormikContext } from 'formik'
import { formFields } from '../form-fields'

const { nameField, externalIdField, authFlowField, appIdField } = formFields

export const StepSubmitAppSuccess: WizardStepComponent = ({ afterClose }) => {
  const { values } = useFormikContext<CustomCreateAppModel>()
  const authFlow = values[authFlowField.name]
  const id = values[appIdField.name]

  return (
    <>
      <ModalBody
        body={
          <div>
            <H5>You have successfully added &apos;{values[nameField.name]}&apos;</H5>
            <b className="mb-1">Authentication</b>
            <div className="mb-3">
              <b>Client ID:</b> {values[externalIdField.name]}
            </div>
            <div className="mb-3">
              {authFlow === AuthFlow.CLIENT_SECRET && <AppAuthenticationDetail withCustomHeader={true} appId={id} />}
            </div>
            <p className="mb-3">Please click on &apos;Finish&apos; below to view your app and edit any details.</p>
            <p className="mb-3">
              You can also use the listing preview to see how your app will display in the Marketplace to potential
              clients.
            </p>
            <p className="mb-3">
              When you are ready to publish your app you will need to add some additional information such as a Summary,
              Description & Images and you will also need to make it &apos;Listed&apos; so it is visible in the
              Marketplace. It will then be sent to our Admin Team for approval.
            </p>
          </div>
        }
      />
      <ModalFooter footerItems={<Button onClick={afterClose}>Finish</Button>} />
    </>
  )
}
