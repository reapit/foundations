import React, { useCallback } from 'react'
import useSWR from 'swr'
import { FormFieldInfo } from '@reapit/utils'
import {
  Button,
  Section,
  ModalV2,
  Formik,
  Form,
  DropdownSelect,
  Loader,
  SelectOption,
  notification,
} from '@reapit/elements'
import { GroupModel } from '../../../types/organisations-schema'
import { URLS } from '../../../constants/api'
import { updateUserGroup } from '../../../services/user'
import { toastMessages } from '../../../constants/toast-messages'

export interface UpdateUserGroupModalProps {
  editingUserGroup: GroupModel | undefined
  setEditingUserGroup: React.Dispatch<React.SetStateAction<GroupModel | undefined>>
  onRefetchData: () => void
}

interface UpdateUserGroupModel {
  description: string
}

type FieldType = 'groupIds'

export const formFields: Record<FieldType, FormFieldInfo> = {
  groupIds: {
    name: 'groupIds',
    label: 'UserGroup Groups',
  },
}

export const prepareGroupOptions: (data: GroupModel[]) => SelectOption[] = data =>
  data.map((UserGroupGroup: GroupModel) => {
    const { id } = UserGroupGroup

    return {
      label: id,
      value: id,
    } as SelectOption
  })

export const onHandleSubmit = (
  handleOnClose: () => void,
  onRefetchData: () => void,
  editingUserGroup?: GroupModel,
) => async (params: UpdateUserGroupModel) => {
  const { description } = params
  const updateUserGroupRes = await updateUserGroup({ description }, editingUserGroup?.id || '')

  if (!updateUserGroupRes) {
    notification.success({
      message: toastMessages.CHANGES_SAVE_SUCCESS,
      placement: 'bottomRight',
    })
    handleOnClose()
    return onRefetchData()
  }

  return notification.error({
    message: updateUserGroupRes.description || toastMessages.FAILED_TO_EDIT_USER_GROUP,
    placement: 'bottomRight',
  })
}

export const UpdateUserGroupModal: React.FC<UpdateUserGroupModalProps> = ({
  editingUserGroup,
  setEditingUserGroup,
  onRefetchData,
}) => {
  const handleOnClose = () => setEditingUserGroup(undefined)
  const { groupIds } = formFields

  const { data }: any = useSWR(`${URLS.USERS}`)
  const onSubmit = useCallback(onHandleSubmit(handleOnClose, onRefetchData, editingUserGroup), [editingUserGroup])

  if (!data) return <Loader />
  const { _embedded: listUserGroupGroup } = data
  const UserGroupGroupOptions = prepareGroupOptions(listUserGroupGroup)

  if (!editingUserGroup) return null

  return (
    <ModalV2
      visible={!!editingUserGroup}
      destroyOnClose={true}
      onClose={handleOnClose}
      title={`Editing ${editingUserGroup.id}`}
      zIndex={90}
    >
      <p className="hepler-text">
        Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.
      </p>
      <Formik
        initialValues={{
          description: editingUserGroup.description || '',
        }}
        onSubmit={onSubmit}
      >
        {() => {
          return (
            <Form noValidate={true}>
              <Section hasPadding={false} hasMargin={false}>
                <DropdownSelect
                  mode="multiple"
                  id={groupIds.name}
                  placeholder="Please select"
                  name={groupIds.name}
                  labelText={groupIds.label}
                  options={UserGroupGroupOptions}
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

export default UpdateUserGroupModal
