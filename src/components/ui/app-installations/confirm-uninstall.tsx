import * as React from 'react'
import { compose, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { InstallationModel } from '@reapit/foundations-ts-definitions'
import {
  ModalHeader,
  ModalBody,
  TextArea,
  withFormik as formik,
  FormikProps,
  ModalFooter,
  Button,
  H6
} from '@reapit/elements'
import {
  UninstallParams,
  appInstallationsRequestUninstall,
  appInstallationsSetFormState
} from '@/actions/app-installations'
import { FormState, ReduxState } from '@/types/core'
import CallToAction from '../call-to-action'

export interface ConfirmUninstallInnerProps {
  appName: string
  installationDetail: InstallationModel | undefined
  onUninstallSuccess: () => void
  afterClose?: () => void
}
export interface ConfirmUninstallMappedProps {
  formState: FormState
}

export interface ConfirmUninstallMappedActions {
  setFormState: (formState: FormState) => void
  uninstallApp: (params: UninstallParams) => void
}

export type ConfirmUninstallProps = ConfirmUninstallInnerProps &
  ConfirmUninstallMappedProps &
  ConfirmUninstallMappedActions &
  FormikProps<TerminatedValues>

export const handleSuccessUninstall = ({ onUninstallSuccess, setFormState }) => () => {
  onUninstallSuccess()
  setFormState('PENDING')
}

export const ConfirmUninstall: React.FC<ConfirmUninstallProps> = ({
  appName,
  afterClose,
  formState,
  setFormState,
  installationDetail,
  onUninstallSuccess,
  handleSubmit
}) => {
  const isSuccessed = formState === 'SUCCESS'
  const isSubmitting = formState === 'SUBMITTING'

  if (isSuccessed) {
    return (
      <CallToAction
        title="Success"
        buttonText="Back to List"
        dataTest="alertUninstallSuccess"
        onButtonClick={handleSuccessUninstall({ onUninstallSuccess, setFormState })}
        isCenter
      >
        '{appName}' has been successfully uninstalled from '{installationDetail?.client}'
      </CallToAction>
    )
  }

  return (
    <>
      <ModalHeader title="Confirm Uninstall" afterClose={afterClose as () => void} />
      <ModalBody
        body={
          <>
            <H6>
              Are you sure you wish to uninstall '{appName}' from ‘{installationDetail?.client}’?
            </H6>
            <TextArea
              name="terminatedReason"
              id="terminatedReason"
              labelText="Please confirm reason for uninstalling"
            />
          </>
        }
      />
      <ModalFooter
        footerItems={
          <>
            <Button
              type="button"
              variant="primary"
              loading={isSubmitting}
              disabled={isSubmitting}
              onClick={handleSubmit}
            >
              Yes, Uninstall
            </Button>
            <Button type="button" variant="secondary" disabled={isSubmitting} onClick={afterClose}>
              Cancel
            </Button>
          </>
        }
      />
    </>
  )
}

// Redux

export const mapStateToProps = (state: ReduxState): ConfirmUninstallMappedProps => ({
  formState: state.installations.formState
})

export const mapDispatchToProps = (dispatch: Dispatch): ConfirmUninstallMappedActions => ({
  setFormState: (formState: FormState) => dispatch(appInstallationsSetFormState(formState)),
  uninstallApp: (params: UninstallParams) => dispatch(appInstallationsRequestUninstall(params))
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

// Formik
export interface TerminatedValues {
  terminatedReason: string
}

export interface TerminatedErrors {
  terminatedReason: string
}

export const mapPropsToValues = (): TerminatedValues => ({
  terminatedReason: ''
})

export const handleSubmit = (values: TerminatedValues, { props }) => {
  const { id = '', appId = '' } = props.installationDetail || {}
  const params: UninstallParams = {
    installationId: id,
    appId: appId,
    terminatedReason: values.terminatedReason
  }
  props.uninstallApp(params)
}

export const validate = (values: TerminatedValues) => {
  let errors = {} as TerminatedErrors
  if (!values.terminatedReason) {
    errors.terminatedReason = 'Required'
  }
  return errors
}

const withFormik = formik({
  displayName: 'Terminated',
  mapPropsToValues: mapPropsToValues,
  validate: validate,
  handleSubmit: handleSubmit
})

export default compose<React.FC<ConfirmUninstallInnerProps>>(withConnect, withFormik)(ConfirmUninstall)
