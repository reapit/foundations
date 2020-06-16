import * as React from 'react'
import { useSelector } from 'react-redux'
import { Modal, ModalProps, Form, SelectOption } from '@reapit/elements'
import { Formik } from 'formik'
import { handleSubmit } from './handlers'
import { selectLoginIdentity } from '@/selector/auth'
import DeveloperEditionModalSubTitle from './developer-edition-modal-sub-title'
import DeveloperEditionModalFormContent from './developer-edition-modal-form-content'
import { FormValues } from './form-fields'

export type DeveloperEditionModalProps = Pick<ModalProps, 'afterClose'> & {
  visible?: boolean
}

export const DeveloperEditionModal: React.FC<DeveloperEditionModalProps> = ({ visible = false, afterClose }) => {
  const loginIdentity = useSelector(selectLoginIdentity)
  // For now just have 1 item: the current developer
  // Need to change to list of developer in organisation after finish "organisation" feature
  const developerName = loginIdentity?.name || ''
  const dropdownOptions: SelectOption[] = [{ value: developerName, label: developerName, description: developerName }]

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
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form className="form">
            <DeveloperEditionModalFormContent dropdownOptions={dropdownOptions} afterClose={afterClose} />
          </Form>
        </Formik>
      </>
    </Modal>
  )
}

export default DeveloperEditionModal
