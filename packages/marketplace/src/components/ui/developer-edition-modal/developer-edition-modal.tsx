import * as React from 'react'
import { useSelector } from 'react-redux'
import {
  Modal,
  ModalProps,
  SubTitleH6,
  FlexContainerBasic,
  Form,
  DropdownSelect,
  Button,
  SelectOption,
} from '@reapit/elements'
import { Formik } from 'formik'
import { handleSubmit } from './handlers'
import { selectLoginIdentity } from '@/selector/auth'
import DeveloperEditionModalSubTitle from './developer-edition-modal-sub-title'

export type DeveloperEditionModalProps = Pick<ModalProps, 'afterClose'> & {
  visible?: boolean
}

export const DeveloperEditionModal: React.FC<DeveloperEditionModalProps> = ({ visible = false, afterClose }) => {
  const loginIdentity = useSelector(selectLoginIdentity)
  // For now just have 1 item: the current developer
  // Need to change to list of developer in organisation after finish "organisation" feature
  const { name: developerName } = loginIdentity
  const dropdownOptions = [{ value: developerName, label: developerName, description: developerName }] as SelectOption[]

  const initialValues = {
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
          {({ handleSubmit: handleSubmitForm }) => (
            <Form className="form" onSubmit={handleSubmitForm}>
              <FlexContainerBasic hasBackground hasPadding flexColumn>
                <DropdownSelect
                  mode="multiple"
                  options={dropdownOptions}
                  labelText="Integration Type"
                  name="developerList"
                  id="developerList"
                  fixedPosition
                />
              </FlexContainerBasic>
              <Button variant="primary" type="submit">
                Send Invite
              </Button>
            </Form>
          )}
        </Formik>
      </>
    </Modal>
  )
}

export default DeveloperEditionModal
