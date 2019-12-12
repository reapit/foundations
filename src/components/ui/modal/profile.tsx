import React from 'react'
import { Button, Input, DatePicker, Formik, Form, FormikValues, FormikErrors, isEmail } from '@reapit/elements'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ReduxState } from '@/types/core'
import { ContactCommunicationModel, ContactModel } from '@/types/platform'
import { updateContact } from '@/actions/checklist-detail'
import { STEPS } from '@/components/ui/modal/modal'
import styles from '@/styles/pages/checklist-detail.scss?mod'

export const validate = (values: FormikValues): FormikErrors<FormikValues> => {
  const errors = {} as FormikErrors<FormikValues>
  if (!values.home && !values.mobile && !values.work) {
    errors.home = 'At least one telephone number is required'
  }

  if (values.email && !isEmail(values.email)) {
    errors.email = 'Invalid email format'
  }
  return errors
}

export const renderForm = ({ contact, onNextHandler, isSubmitting }) => ({ values }) => {
  const { id } = contact
  return (
    <Form>
      <Input type="text" labelText="Title" id="title" name="title" required />
      <Input type="text" labelText="Forename" id="forename" name="forename" required />
      <Input type="text" labelText="Surname" id="surname" name="surname" required />
      <DatePicker labelText="Date Of Birth" id="dateOfBirth" name="dateOfBirth" required />
      <p className="is-size-6	">* At least one telephone number is required</p>
      <Input type="text" labelText="Home" id="home" name="home" />
      <Input type="text" labelText="Mobile" id="mobile" name="mobile" />
      <Input type="text" labelText="Work" id="work" name="work" />
      <Input type="email" labelText="Email" id="email" name="email" />
      <div className="field pb-2">
        <div className={`columns ${styles.reverseColumns}`}>
          <div className="column">
            <div className={`${styles.isFullHeight} flex items-center`}>
              <span>RPS Ref:</span>
              <span className="ml-1">{id}</span>
            </div>
          </div>
          <div className={`column ${styles.btnContainer}`}>
            <Button loading={isSubmitting} type="submit" className="mr-2" variant="primary">
              Save
            </Button>
            <Button
              disabled={isSubmitting}
              type="button"
              variant="primary"
              dataTest="submit-revision-modal-edit-button"
              onClick={onNextHandler(values)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
      <p className="is-size-6">* Indicates fields that are required in order to ‘Complete’ this section.</p>
    </Form>
  )
}

export const filterCommunication = (
  communications: ContactCommunicationModel[] | undefined,
  type: 'Home' | 'Mobile' | 'Work' | 'E-Mail'
) => {
  if (!communications) {
    return null
  }
  const newCommunication: ContactCommunicationModel | undefined = communications.find(
    (communication: ContactCommunicationModel) => {
      return communication.label === type
    }
  )
  if (newCommunication) {
    return newCommunication.detail
  }
  return null
}

export type ProfileProps = DispatchProps & StateProps

export const Profile: React.FC<ProfileProps> = ({ contact, onNextHandler, onSubmitHandler, isSubmitting }) => {
  return (
    <div>
      <Formik
        initialValues={{
          title: contact.title,
          forename: contact.forename,
          surname: contact.surname,
          dateOfBirth: contact.dateOfBirth ? new Date(contact.dateOfBirth) : null,
          home: filterCommunication(contact.communications, 'Home'),
          work: filterCommunication(contact.communications, 'Work'),
          mobile: filterCommunication(contact.communications, 'Mobile'),
          email: filterCommunication(contact.communications, 'E-Mail')
        }}
        onSubmit={onSubmitHandler}
        validate={validate}
      >
        {renderForm({ contact, onNextHandler, isSubmitting })}
      </Formik>
    </div>
  )
}

export type StateProps = {
  isSubmitting: boolean
  contact: ContactModel
}

export const mapStateToProps = (state: ReduxState): StateProps => {
  return {
    isSubmitting: state?.checklistDetail?.isSubmitting || false,
    contact: state?.checklistDetail?.checklistDetailData?.contact || {}
  }
}

export type DispatchProps = {
  onNextHandler: (values) => () => void
  onSubmitHandler: (values: any) => void
}

export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    onSubmitHandler: values => {
      const newValues: ContactModel = {
        ...values,
        communications: [
          { label: 'Home', detail: values.home },
          { label: 'Mobile', detail: values.mobile },
          { label: 'Work', detail: values.work },
          { label: 'E-Mail', detail: values.email }
        ]
      }
      dispatch(updateContact({ contact: newValues }))
    },
    onNextHandler: values => () => {
      const newValues: ContactModel = {
        ...values,
        communications: [
          { label: 'Home', detail: values.home },
          { label: 'Mobile', detail: values.mobile },
          { label: 'Work', detail: values.work },
          { label: 'E-Mail', detail: values.email }
        ]
      }
      dispatch(updateContact({ nextSection: STEPS.PRIMARY_IDENTIFICATION, contact: newValues }))
    }
  }
}

export const ProfileInformationWithRedux = connect(mapStateToProps, mapDispatchToProps)(Profile)

ProfileInformationWithRedux.displayName = 'ProfileInformationWithRedux'

export default ProfileInformationWithRedux
