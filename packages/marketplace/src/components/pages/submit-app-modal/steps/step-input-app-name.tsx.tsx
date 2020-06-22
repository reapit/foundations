import React from 'react'
import { Modal, ModalBody, ModalProps, Button, Formik, Input, Form, FormFieldInfo, ModalFooter } from '@reapit/elements'
import { submitAppWizzardChangeStep } from '@/actions/submit-app'
import { useDispatch } from 'react-redux'
import errorMessages from '@/constants/error-messages'
import * as Yup from 'yup'
import { Dispatch } from 'redux'

type Field = 'nameField'
const formFields: Record<Field, FormFieldInfo> = {
  nameField: {
    name: 'name',
    label: 'Your app name as it will display to users',
  },
}

const { nameField } = formFields

/* istanbul ignore next */
const validationSchema = Yup.object().shape({
  [formFields.nameField.name]: Yup.string().required(errorMessages.FIELD_REQUIRED),
})

export const onNext = ({ dispatch, name }: { dispatch: Dispatch; name: string }) => () => {
  dispatch(submitAppWizzardChangeStep({ formStep: 'BEFORE_YOU_START', formState: { name } }))
}
export const onPrev = (dispatch: Dispatch) => () => {
  dispatch(submitAppWizzardChangeStep({ formStep: 'BEFORE_YOU_START' }))
}

export const StepInputAppName: React.FC<ModalProps> = ({ visible, afterClose }) => {
  const dispatch = useDispatch()

  return (
    <Modal renderChildren visible={visible} afterClose={afterClose} title="App Name">
      <div>
        <p>Your app name as it will display to users</p>
        <Formik initialValues={{ [nameField.name]: '' }} onSubmit={() => {}} validationSchema={validationSchema}>
          {({ values, isValid }) => (
            <>
              <ModalBody
                body={
                  <Form>
                    <Input type="text" id={nameField.name} name={nameField.name} labelText={nameField.label} />
                  </Form>
                }
              />
              <ModalFooter
                footerItems={
                  <>
                    <Button onClick={onPrev(dispatch)}>Back</Button>
                    <Button disabled={isValid} onClick={onNext({ dispatch, name: values.name })}>
                      Next
                    </Button>
                  </>
                }
              />
            </>
          )}
        </Formik>
      </div>
    </Modal>
  )
}
