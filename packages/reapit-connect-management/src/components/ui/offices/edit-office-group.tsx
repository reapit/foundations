import React from 'react'
import { FormFieldInfo } from '@reapit/utils'
import { OfficeGroupModel } from '../../../types/organisations-schema'
import { Button, Section, ModalV2, Formik, Form, Input, DropdownSelect, notification, Checkbox } from '@reapit/elements'
import { updateOfficeGroup } from '../../../services/office'
import { toastMessages } from '../../../constants/toast-messages'
import { prepareOfficeOptions } from '../../../utils/prepare-options'
import { OfficeModelPagedResult } from '@reapit/foundations-ts-definitions'

export interface UpdateOfficeGroupModalProps {
  editingGroup: OfficeGroupModel | undefined
  setEditingGroup: React.Dispatch<React.SetStateAction<OfficeGroupModel | undefined>>
  orgId: string
  onRefetchData: () => void
  offices: OfficeModelPagedResult
}

interface UpdateOfficeGroupModel {
  name: string
  officeIds: string[]
  status: boolean
}

type FieldType = 'name' | 'officeIds' | 'status'

export const formFields: Record<FieldType, FormFieldInfo> = {
  name: {
    name: 'name',
    label: 'Name',
  },
  officeIds: {
    name: 'officeIds',
    label: 'Offices',
  },
  status: {
    name: 'status',
    label: 'Active',
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
  const status = params.status ? 'active' : 'inactive'
  const updateOffice = await updateOfficeGroup({ name, officeIds, status }, orgId, editingGroup?.id || '')

  if (updateOffice) {
    notification.success({
      message: toastMessages.CHANGES_SAVE_SUCCESS,
      placement: 'bottomRight',
    })
    handleOnClose()
    onRefetchData()
    return
  }

  notification.error({
    message: toastMessages.FAILED_TO_EDIT_OFFICE_GROUP,
    placement: 'bottomRight',
  })
}

export const UpdateOfficeGroupModal: React.FC<UpdateOfficeGroupModalProps> = ({
  editingGroup,
  setEditingGroup,
  orgId,
  onRefetchData,
  offices,
}) => {
  const handleOnClose = () => setEditingGroup(undefined)
  const { name, officeIds, status } = formFields

  const { _embedded: listOffice } = offices
  const officeOptions = prepareOfficeOptions(listOffice || [])

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
      <p className="mb-4">
        <i>
          To manage members associated to this group, you can search and select users from the ‘Groups Members’ section
          below:
        </i>
      </p>
      <Formik
        initialValues={{
          name: editingGroup.name || '',
          officeIds: editingGroup.officeIds?.split(',') || [],
          status: editingGroup.status === 'active',
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
                  filterOption={true}
                  optionFilterProp="children"
                />
                <Checkbox id={status.name} labelText={status.label as string} name={status.name} />
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
