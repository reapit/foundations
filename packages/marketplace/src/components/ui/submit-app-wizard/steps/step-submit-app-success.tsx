import React from 'react'
import { CustomCreateAppModel } from '@/actions/submit-app'
import { ModalBody, Button, ModalFooter, H4, H5 } from '@reapit/elements'
import { WizardStepComponent } from '../types'
import { useFormikContext } from 'formik'
import { Dispatch } from 'redux'
import { useDispatch } from 'react-redux'
import { developerRequestData } from '@/actions/developer'

export const onFinnish = (dispatch: Dispatch) => () => {
  // refetch developer-app-detail
  const queryParams = new URLSearchParams(window.location.search)
  const page = queryParams.get('page') ? Number(queryParams.get('page')) : 1
  dispatch(developerRequestData({ page }))
}

export const StepSubmitAppSuccess: WizardStepComponent = () => {
  const { values } = useFormikContext<CustomCreateAppModel>()
  const dispatch = useDispatch()

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
      <ModalFooter footerItems={<Button onClick={onFinnish(dispatch)}>Finish</Button>} />
    </>
  )
}
