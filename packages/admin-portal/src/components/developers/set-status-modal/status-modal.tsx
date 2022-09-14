import React, { useState } from 'react'
import { ModalV2, Formik, Form, Button, RadioSelect, RadioSelectOption, Input, FormikProps } from '@reapit/elements'
import { UpdateDeveloperModel, DeveloperModel } from '@reapit/foundations-ts-definitions'
import { setRequestDeveloperStatusFormState } from '@/actions/developer-set-status'
import { Dispatch } from 'redux'
import { useDispatch } from 'react-redux'
import { validationSchema } from './form-schema'

interface StatusModalProps {
  visible: boolean
  developer: DeveloperModel
  resetModal: (refreshDevList: boolean) => any
}

export const onSubmitStatus = (developer: UpdateDeveloperModel, dispatch: Dispatch, setSubmitting, onAfterSubmit) => {
  return ({ status, reapitReference }) => {
    setSubmitting(true)
    dispatch(
      setRequestDeveloperStatusFormState({
        ...developer,
        status,
        reapitReference,
        callback: onAfterSubmit,
      }),
    )
  }
}

export const onAfterSubmit = (setSubmitting, onClose) => (success: boolean) => {
  setSubmitting(false)
  if (success) onClose()
}

export const reapitRefInput: React.FC<FormikProps<any>> = (form) => {
  const { values } = form
  if (values.status === 'confirmed')
    return (
      <Input
        name="reapitReference"
        labelText="Reapit Ref"
        type="text"
        id="reapitReference"
        placeholder="Please enter reference"
        className="mt-2"
      />
    )
  return null
}

const options: RadioSelectOption[] = [
  {
    value: 'incomplete',
    label: 'Incomplete',
  },
  {
    value: 'pending',
    label: 'Pending',
  },
  {
    value: 'confirmed',
    label: 'Confirmed',
    additionalField: reapitRefInput,
  },
  {
    value: 'underReview',
    label: 'Under Review',
  },
  {
    value: 'removed',
    label: 'Removed',
  },
]

export const StatusModal: React.FC<StatusModalProps> = ({ visible, developer, resetModal }) => {
  const dispatch = useDispatch()
  const [submitting, setSubmitting] = useState(false)

  if (!visible) return null

  const { company, status, reapitReference } = developer
  const initialValues = {
    status,
    reapitReference: reapitReference ?? '',
  }
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmitStatus(developer, dispatch, setSubmitting, onAfterSubmit(setSubmitting, resetModal(true)))}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, setFieldValue, values }) => {
        const { status } = values
        return (
          <ModalV2
            title={company}
            visible={visible}
            isCentered
            footer={[
              <Button className="mr-2" key="close" type="button" variant="danger" onClick={resetModal(false)}>
                CANCEL
              </Button>,
              <Button variant="primary" key="submit" type="submit" loading={submitting} onClick={handleSubmit}>
                SAVE
              </Button>,
            ]}
            destroyOnClose
            onClose={resetModal(false)}
          >
            <p className="label">Status</p>
            <Form>
              <RadioSelect name="status" id="status" options={options} setFieldValue={setFieldValue} state={status} />
            </Form>
          </ModalV2>
        )
      }}
    </Formik>
  )
}

export default StatusModal
