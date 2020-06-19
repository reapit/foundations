import { DeveloperModel } from '@reapit/foundations-ts-definitions'
import * as React from 'react'
import { useSelector } from 'react-redux'
import { Modal, ModalProps, Form, SelectOption } from '@reapit/elements'
import { Formik } from 'formik'
import { selectLoginIdentity } from '@/selector/auth'
import DeveloperEditionModalSubTitle from './developer-edition-modal-sub-title'
import DeveloperEditionModalFormContent from './developer-edition-modal-form-content'
import { FormValues } from './form-fields'

export type HandleSubmitFunctionType = (values: Partial<DeveloperModel>[]) => void

export type DeveloperEditionModalProps = Pick<ModalProps, 'afterClose'> & {
  visible?: boolean
  confirmSubscription: HandleSubmitFunctionType
}

const handleFormSubmit = (developerLists: Partial<DeveloperModel>[], confirmSubscription: HandleSubmitFunctionType) => (
  values: FormValues,
) => {
  const selectedDeveloperIds = values.developerList
  const selectedDevelopers = developerLists.filter(developer => selectedDeveloperIds.includes(developer.id || ''))
  confirmSubscription(selectedDevelopers)
}

export const DeveloperEditionModal: React.FC<DeveloperEditionModalProps> = ({
  visible = false,
  confirmSubscription,
  afterClose,
}) => {
  const loginIdentity = useSelector(selectLoginIdentity)
  // For now just have 1 item: the current developer
  // Need to change to list of developer in organisation after finish "organisation" feature
  const developerName = loginIdentity?.name
  const developerId = loginIdentity?.developerId || ''
  const developerEmail = loginIdentity?.email
  const developerLists: Partial<DeveloperModel>[] = [{ id: developerId, name: developerName, email: developerEmail }]

  const dropdownOptions: SelectOption[] = developerLists.map(({ id, name }) => ({
    value: id || '',
    label: name || '',
    description: name,
  }))

  const initialValues: FormValues = {
    developerList: dropdownOptions.map(({ value }) => value),
  }

  if (!visible) {
    return null
  }

  return (
    <Modal visible={visible} afterClose={afterClose} title="Agency Cloud Developer Edition">
      <>
        <DeveloperEditionModalSubTitle />
        <Formik initialValues={initialValues} onSubmit={handleFormSubmit(developerLists, confirmSubscription)}>
          <Form className="form">
            <DeveloperEditionModalFormContent dropdownOptions={dropdownOptions} afterClose={afterClose} />
          </Form>
        </Formik>
      </>
    </Modal>
  )
}

export default DeveloperEditionModal
