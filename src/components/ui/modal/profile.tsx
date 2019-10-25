import React from 'react'
import { Button, Input, DatePicker } from '@reapit/elements'
import { Formik, Form } from 'formik'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { oc } from 'ts-optchain'
import { ReduxState } from '@/types/core'
import { CommunicationModel, ContactModel } from '@/types/contact-api-schema'
import { updateContact } from '@/actions/checklist-detail'
import { STEPS } from '@/components/ui/modal/modal'

export const renderForm = ({ contact, onNextHandler, isSubmitting }) => ({ values }) => {
  const { id } = contact
  return (
    <Form>
      <Input type="text" labelText="Title" id="title" name="title" />
      <Input type="text" labelText="Forename" id="forename" name="forename" />
      <Input type="text" labelText="Surname" id="surname" name="surname" />
      <DatePicker labelText="Date Of Birth" id="dateOfBirth" name="dateOfBirth" />
      <Input type="text" labelText="Home" id="home" name="home" />
      <Input type="text" labelText="Mobile" id="mobile" name="mobile" />
      <Input type="text" labelText="Work" id="work" name="work" />
      <Input type="email" labelText="Email" id="email" name="email" />
      <div className="flex mt-4 justify-between">
        <div className="flex items-center">
          <span>RPS Ref:</span>
          <span className="ml-1">{id}</span>
        </div>
        <div>
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
    </Form>
  )
}

export const filterCommunication = (
  communications: CommunicationModel[] | undefined,
  type: 'Home' | 'Mobile' | 'Work' | 'E-Mail'
) => {
  if (!communications) {
    return null
  }
  const newCommunication: CommunicationModel | undefined = communications.find((communication: CommunicationModel) => {
    return communication.label === type
  })
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
        render={renderForm({ contact, onNextHandler, isSubmitting })}
      />
    </div>
  )
}

export type StateProps = {
  isSubmitting: boolean
  contact: ContactModel
}

export const mapStateToProps = (state: ReduxState): StateProps => {
  return {
    isSubmitting: oc(state).checklistDetail.isSubmitting(false),
    contact: oc(state).checklistDetail.checklistDetailData.contact({})
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

export const ProfileInformationWithRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)

ProfileInformationWithRedux.displayName = 'ProfileInformationWithRedux'

export default ProfileInformationWithRedux
