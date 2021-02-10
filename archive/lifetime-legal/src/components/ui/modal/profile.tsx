import React from 'react'
import { Button, Input, DatePicker, Formik, Form } from '@reapit/elements'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ReduxState } from '@/types/core'
import { ContactModel } from '@reapit/foundations-ts-definitions'
import { checkListDetailUpdateData } from '@/actions/checklist-detail'

export const renderForm = ({ isSubmitting }) => () => {
  return (
    <Form>
      <Input type="text" labelText="Title" id="title" name="title" />
      <Input type="text" labelText="Forename" id="forename" name="forename" />
      <Input type="text" labelText="Surname" id="surname" name="surname" />
      <DatePicker labelText="Date Of Birth" id="dateOfBirth" name="dateOfBirth" />
      <Input type="text" labelText="Home" id="homePhone" name="homePhone" />
      <Input type="text" labelText="Mobile" id="mobilePhone" name="mobilePhone" />
      <Input type="text" labelText="Work" id="workPhone" name="workPhone" />
      <Input type="email" labelText="Email" id="email" name="email" />
      <div className="flex justify-end">
        <Button loading={isSubmitting} type="submit" className="mr-2" variant="primary">
          Save
        </Button>
      </div>
    </Form>
  )
}

export type ProfileProps = StateProps & DispatchProps

export const Profile: React.FC<ProfileProps> = ({ contact, onSubmitHandler, isSubmitting }: ProfileProps) => {
  return (
    <div>
      <Formik
        initialValues={{
          title: contact.title,
          forename: contact.forename,
          surname: contact.surname,
          dateOfBirth: contact.dateOfBirth ? new Date(contact.dateOfBirth) : null,
          homePhone: contact.homePhone,
          workPhone: contact.workPhone,
          mobilePhone: contact.mobilePhone,
          email: contact.email,
        }}
        onSubmit={onSubmitHandler}
      >
        {renderForm({ isSubmitting })}
      </Formik>
    </div>
  )
}

export type StateProps = {
  contact: ContactModel
  isSubmitting: boolean
}

export const mapStateToProps = (state: ReduxState): StateProps => {
  return {
    isSubmitting: state?.checklistDetail?.isSubmitting || false,
    contact: state?.checklistDetail?.checklistDetailData?.contact || {},
  }
}

export type DispatchProps = {
  onSubmitHandler: (values) => void
}

export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    onSubmitHandler: values => dispatch(checkListDetailUpdateData(values)),
  }
}

export const ProfileInformationWithRedux = connect(mapStateToProps, mapDispatchToProps)(Profile)

ProfileInformationWithRedux.displayName = 'ProfileInformationWithRedux'

export default ProfileInformationWithRedux
