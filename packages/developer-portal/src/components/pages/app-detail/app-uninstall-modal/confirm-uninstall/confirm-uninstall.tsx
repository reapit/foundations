import * as React from 'react'
import { Dispatch } from 'redux'
import { useSelector, useDispatch } from 'react-redux'
import { InstallationModel } from '@reapit/foundations-ts-definitions'
import { ModalHeader, ModalBody, TextArea, ModalFooter, Button, SubTitleH6, Formik, Form } from '@reapit/elements'
import {
  UninstallParams,
  appInstallationsRequestUninstall,
  appInstallationsSetFormState,
} from '@/actions/app-installations'
import CallToAction from '@/components/ui/call-to-action'
import { selectInstallationFormState } from '@/selector/installations'
import formFields from './form-schema/form-fields'
import validationSchema from './form-schema/validation-schema'

const { terminatedReasonField } = formFields

export type ConfirmUninstallProps = {
  appName: string
  installationDetail: InstallationModel | undefined
  onUninstallSuccess: () => void
  afterClose?: () => void
  isSetAppDetailStaleAfterUninstallSuccess?: boolean
}

export type ConfirmUninstallFormValues = {
  terminatedReason: string
}

export const initialValues: ConfirmUninstallFormValues = {
  terminatedReason: '',
}

export const handleSuccessUninstall = (
  onUninstallSuccess: () => void,
  dispatch: Dispatch,
  isSetAppDetailStaleAfterUninstallSuccess: boolean,
) => () => {
  onUninstallSuccess()
  dispatch(appInstallationsSetFormState('PENDING'))
  // if (isSetAppDetailStaleAfterUninstallSuccess) {
  //   dispatch(setAppDetailStale(true))
  // }
}

export const handleSubmit = (dispatch: Dispatch, installationDetail?: InstallationModel) => {
  return (values: ConfirmUninstallFormValues) => {
    const { id = '', appId = '' } = installationDetail || {}
    const params: UninstallParams = {
      installationId: id,
      appId: appId,
      terminatedReason: values.terminatedReason,
    }
    dispatch(appInstallationsRequestUninstall(params))
  }
}

export const ConfirmUninstall: React.FC<ConfirmUninstallProps> = ({
  appName,
  afterClose,
  installationDetail,
  onUninstallSuccess,
  isSetAppDetailStaleAfterUninstallSuccess = true,
}) => {
  const dispatch = useDispatch()
  const formState = useSelector(selectInstallationFormState)
  const isSuccess = formState === 'SUCCESS'
  const isSubmitting = formState === 'SUBMITTING'

  if (isSuccess) {
    return (
      <CallToAction
        title="Success"
        buttonText="Back to App"
        dataTest="alertUninstallSuccess"
        onButtonClick={handleSuccessUninstall(onUninstallSuccess, dispatch, isSetAppDetailStaleAfterUninstallSuccess)}
        isCenter
      >
        <div className="mb-3">
          &lsquo;{appName}&rsquo; has been successfully uninstalled from &lsquo;{installationDetail?.client}&rsquo;
        </div>
      </CallToAction>
    )
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit(dispatch, installationDetail)}
      validationSchema={validationSchema}
    >
      <Form>
        <ModalHeader title="Confirm Uninstall" afterClose={afterClose as () => void} />
        <ModalBody
          body={
            <>
              <SubTitleH6>
                Are you sure you wish to uninstall &lsquo;{appName}&rsquo; from ‘{installationDetail?.client}’?
              </SubTitleH6>
              <SubTitleH6>&#42;Please confirm reason for uninstalling</SubTitleH6>
              <TextArea name={terminatedReasonField.name} id={terminatedReasonField.name} />
            </>
          }
        />
        <ModalFooter
          footerItems={
            <>
              <Button type="submit" loading={isSubmitting} disabled={isSubmitting} className="mx-4" fullWidth>
                Yes, Uninstall
              </Button>
              <Button
                type="button"
                variant="danger"
                disabled={isSubmitting}
                onClick={afterClose}
                className="mx-4"
                fullWidth
              >
                Cancel
              </Button>
            </>
          }
        />
      </Form>
    </Formik>
  )
}

export default ConfirmUninstall
