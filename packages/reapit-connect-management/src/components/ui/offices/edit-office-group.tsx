import React from 'react'
import useSWR from 'swr'
import { FormFieldInfo } from '@reapit/utils'
import { OfficeGroupModel } from '../../../types/organisations-schema'
import { Button, Section, ModalV2, Formik, Form, Input, DropdownSelect, notification } from '@reapit/elements'
import { URLS } from '../../../constants/api'
import { updateOfficeGroup } from '../../../services/office'
import { toastMessages } from '../../../constants/toast-messages'
import { prepareOfficeOptions } from '../../../utils/prepare-options'

export interface UpdateOfficeGroupModalProps {
  editingGroup: OfficeGroupModel | undefined
  setEditingGroup: React.Dispatch<React.SetStateAction<OfficeGroupModel | undefined>>
  orgId: string
  onRefetchData: () => void
}

interface UpdateOfficeGroupModel {
  name: string
  officeIds: string[]
}

type FieldType = 'name' | 'officeIds'

export const formFields: Record<FieldType, FormFieldInfo> = {
  name: {
    name: 'name',
    label: 'Name',
  },
  officeIds: {
    name: 'officeIds',
    label: 'Offices',
  },
}
export const onHandleSubmit = (
  handleOnClose: () => void,
  onRefetchData: () => void,
  editingGroup: OfficeGroupModel,
  orgId: string,
) => async (params: UpdateOfficeGroupModel) => {
  const { name, officeIds: listId } = params
  const officeIds = listId.toString()
  const updateOffice = await updateOfficeGroup(
    { name, officeIds, status: editingGroup?.status || '' },
    orgId,
    editingGroup?.id || '',
  )

  if (!updateOffice) {
    notification.success({
      message: toastMessages.CHANGES_SAVE_SUCCESS,
      placement: 'bottomRight',
    })
    handleOnClose()
    onRefetchData()
    return
  }

  notification.error({
    message: updateOffice.description || toastMessages.FAILED_TO_EDIT_OFFICE_GROUP,
    placement: 'bottomRight',
  })
}

export const UpdateOfficeGroupModal: React.FC<UpdateOfficeGroupModalProps> = ({
  editingGroup,
  setEditingGroup,
  orgId,
  onRefetchData,
}) => {
  const handleOnClose = () => setEditingGroup(undefined)
  const { name, officeIds } = formFields

  const { data }: any = useSWR(`${URLS.OFFICES}`)
  if (!data) return null
  const { _embedded: listOffice } = data
  const officeOptions = prepareOfficeOptions(listOffice)

  if (!editingGroup) return null
  const onSubmit = onHandleSubmit(handleOnClose, onRefetchData, editingGroup, orgId)

  return (
    <ModalV2
      visible={!!editingGroup}
      destroyOnClose={true}
      onClose={handleOnClose}
      title={`Editing ${editingGroup.name}`}
      zIndex={90}
    >
      <p className="helper-text">
        Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.
      </p>
      <Formik
        initialValues={{
          name: editingGroup.name || '',
          officeIds: editingGroup.officeIds?.split(',') || [],
          status: editingGroup.status || '',
        }}
        onSubmit={onSubmit}
      >
        {() => {
          return (
            <Form noValidate={true}>
              <Section hasPadding={false} hasMargin={false}>
                <Input type="text" labelText={name.label} id={name.name} name={name.name} />
                <DropdownSelect
                  mode="multiple"
                  id={officeIds.name}
                  placeholder="Please select"
                  name={officeIds.name}
                  labelText={officeIds.label}
                  options={officeOptions}
                />
              </Section>
              <Section isFlex hasPadding={false} hasMargin={false}>
                <Button variant="info" disabled={false} onClick={handleOnClose} type="button">
                  Cancel
                </Button>
                <Button variant="info" loading={false} type="submit">
                  Save
                </Button>
              </Section>
            </Form>
          )
        }}
      </Formik>
    </ModalV2>
  )
}

export default UpdateOfficeGroupModal
