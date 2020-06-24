import React from 'react'
import { submitApp, CustomCreateAppModel } from '@/actions/submit-app'
import { ModalBody, Button, ModalFooter, H4, H5, FormikErrors } from '@reapit/elements'
import { WizzardStepComponent, SetWizzardStep } from '../types'
import { useFormikContext } from 'formik'
import { Dispatch } from 'redux'
import { useDispatch } from 'react-redux'

export type OnFinishParams = {
  dispatch: Dispatch
  values: CustomCreateAppModel
  setErrors: (errors: FormikErrors<CustomCreateAppModel>) => void
  setWizzardStep: SetWizzardStep
  afterClose: (() => void) | undefined
}

export const onFinish = ({ values, setErrors, dispatch, setWizzardStep, afterClose }: OnFinishParams) => () => {
  const { redirectUris, signoutUris, ...otherData } = values
  const appToSubmit = {
    ...otherData,
    redirectUris: redirectUris ? redirectUris.split(',') : [],
    signoutUris: signoutUris ? signoutUris.split(',') : [],
  }

  dispatch(submitApp({ ...appToSubmit, setErrors, setWizzardStep, afterClose }))
}

export const StepSubmitAppSuccess: WizzardStepComponent = ({ setWizzardStep, afterClose }) => {
  const dispatch = useDispatch()
  const { values, setErrors } = useFormikContext<CustomCreateAppModel>()

  return (
    <>
      <ModalBody
        body={
          <div>
            <H4>You have successfully added &apos;{values.name}&apos;</H4>
            <H5 className="mb-1">Authentication</H5>
            <p className="mb-3">Client ID: </p>
            <p className="mb-3">Please click on &apos;Finish&apos; below to view your app and edit any details.</p>
            <p className="mb-3">
              You can also use the listing preview to see how your app will display in the Marketplace. to potential
              clients.
            </p>
            <p className="mb-3">
              When you are ready to publish your app you will need to add some additional information such as a Summary,
              Description & Images and you will also need to make it &apos;Listed&apos; so it is visible in the
              Marketplace. It will then be sent to our Admin Team for approval. For more information on the App
              Submission process, please click here.
            </p>
          </div>
        }
      />
      <ModalFooter
        footerItems={
          <Button
            type="submit"
            onClick={onFinish({
              setWizzardStep,
              setErrors,
              values,
              dispatch,
              afterClose,
            })}
          >
            Finish
          </Button>
        }
      />
    </>
  )
}
