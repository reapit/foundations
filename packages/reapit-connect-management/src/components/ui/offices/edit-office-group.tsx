import React from 'react'
import useSWR from 'swr'
import { FormFieldInfo } from '@reapit/utils'
import { OfficeGroupModel } from '@reapit/foundations-ts-definitions'
import {
  Button,
  Section,
  ModalV2,
  H5,
  Formik,
  Form,
  Input,
  DropdownSelect,
  Loader,
  notification,
} from '@reapit/elements'
import { URLS } from '../../../constants/api'
import { updateOfficeGroup } from '../../../services/office'
import { errorMessages } from '../../../constants/errorMessages'
import { prepareOfficeOptions } from '../../../utils/prepareOptions'

export interface UpdateOfficeGroupModalProps {
  editingGroup: OfficeGroupModel | undefined
  setEditingGroup: React.Dispatch<React.SetStateAction<OfficeGroupModel | undefined>>
  orgId: string
  onRefetchData: Function
}

export interface UpdateOfficeGroupModel {
  name: string
  officeIds: string[]
}

export type FieldType = 'name' | 'officeIds'

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

export const UpdateOfficeGroupModal: React.FC<UpdateOfficeGroupModalProps> = ({
  editingGroup,
  setEditingGroup,
  orgId,
  onRefetchData,
}) => {
  const handleOnClose = () => setEditingGroup(undefined)
  const { name, officeIds } = formFields

  const { data }: any = useSWR(`${URLS.OFFICES}`)
  if (!data) return <Loader />
  const { _embedded: listOffice } = data
  const officeOptions = prepareOfficeOptions(listOffice)

  const onSubmit = async (params: UpdateOfficeGroupModel) => {
    const { name, officeIds: listId } = params
    const officeIds = listId.toString()
    const updateOffice = await updateOfficeGroup(
      { name, officeIds, status: editingGroup?.status || '' },
      orgId,
      editingGroup?.id || '',
    )

    if (!updateOffice) {
      notification.success({
        message: errorMessages.EDIT_OFFICE_GROUP_SUCCESS,
        placement: 'bottomRight',
      })
      handleOnClose()
      return onRefetchData()
    }

    return notification.error({
      message: updateOffice.description || errorMessages.FAILED_TO_EDIT_OFFICE_GROUP,
      placement: 'bottomRight',
    })
  }

  if (!editingGroup) return null

  return (
    <ModalV2 visible={!!editingGroup} destroyOnClose={true} onClose={handleOnClose} title="Manage Offices" zIndex={90}>
      <H5>{`Editing ${editingGroup.name}`}</H5>
      <p>
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
                  Edit
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
