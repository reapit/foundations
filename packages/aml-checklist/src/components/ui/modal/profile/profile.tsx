import React from 'react'
import { Button, Input, DatePicker, Formik, Form } from '@reapit/elements'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ReduxState } from '@/types/core'
import { ContactModel } from '@reapit/foundations-ts-definitions'
import { updateContact } from '@/actions/checklist-detail'
import { STEPS } from '@/components/ui/modal/modal'
import styles from '@/styles/pages/checklist-detail.scss?mod'
import validationSchema from './form-schema/validation-schema'
import formFields from './form-schema/form-fields'

const {
  titleField,
  forenameField,
  surnameField,
  dateOfBirthField,
  homePhoneField,
  mobilePhoneField,
  workPhoneField,
  emailField,
} = formFields

export const renderForm = ({ contact, onNextHandler, isSubmitting }) => ({ values }) => {
  const { id } = contact
  return (
    <Form>
      <Input type="text" labelText={titleField.label} id={titleField.name} name={titleField.name} />
      <Input type="text" labelText={forenameField.label} id={forenameField.name} name={forenameField.name} />
      <Input type="text" labelText={surnameField.label} id={surnameField.name} name={surnameField.name} />
      <DatePicker labelText={dateOfBirthField.label} id={dateOfBirthField.name} name={dateOfBirthField.name} />
      <p className="is-size-6">* At least one telephone number is required</p>
      <Input type="text" labelText={homePhoneField.label} id={homePhoneField.name} name={homePhoneField.name} />
      <Input type="text" labelText={mobilePhoneField.label} id={mobilePhoneField.name} name={mobilePhoneField.name} />
      <Input type="text" labelText={workPhoneField.label} id={workPhoneField.name} name={workPhoneField.name} />
      <Input type="email" labelText={emailField.label} id={emailField.name} name={emailField.name} />
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

export type ProfileProps = DispatchProps & StateProps

export const Profile: React.FC<ProfileProps> = ({ contact, onNextHandler, onSubmitHandler, isSubmitting }) => {
  const { title, forename, surname, dateOfBirth, homePhone, workPhone, mobilePhone, email } = contact
  return (
    <div>
      <Formik
        initialValues={{
          [titleField.name]: title,
          [forenameField.name]: forename,
          [surnameField.name]: surname,
          [dateOfBirthField.name]: dateOfBirth ? new Date(dateOfBirth) : null,
          [homePhoneField.name]: homePhone,
          [workPhoneField.name]: workPhone,
          [mobilePhoneField.name]: mobilePhone,
          [emailField.name]: email,
        }}
        onSubmit={onSubmitHandler}
        validationSchema={validationSchema}
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
    contact: state?.checklistDetail?.checklistDetailData?.contact || {},
  }
}

export type DispatchProps = {
  onNextHandler: (values) => () => void
  onSubmitHandler: (values: any) => void
}

export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    onSubmitHandler: values => {
      dispatch(updateContact({ contact: values }))
    },
    onNextHandler: values => () => {
      dispatch(updateContact({ nextSection: STEPS.PRIMARY_IDENTIFICATION, contact: values }))
    },
  }
}

export const ProfileInformationWithRedux = connect(mapStateToProps, mapDispatchToProps)(Profile)

ProfileInformationWithRedux.displayName = 'ProfileInformationWithRedux'

export default ProfileInformationWithRedux
