import React, { useCallback } from 'react'
import useSWR from 'swr'
import qs from 'query-string'
import { FormFieldInfo } from '@reapit/utils'
import {
  Button,
  Section,
  ModalV2,
  Formik,
  Form,
  DropdownSelect,
  Loader,
  notification,
  ButtonGroup,
} from '@reapit/elements'
import { UserModel, GroupModelPagedResult } from '../../../types/organisations-schema'
import { URLS } from '../../../constants/api'
import { addMemberToGroup, removeMemberFromGroup } from '../../../services/user'
import { toastMessages } from '../../../constants/toast-messages'
import { prepareUserGroupOptions } from '../../../utils/prepare-options'

export interface UpdateUserModalProps {
  editingUser: UserModel | undefined
  setEditingUser: React.Dispatch<React.SetStateAction<UserModel | undefined>>
  onRefetchData: () => void
  orgId: string
}

interface UpdateUserModel {
  groupIds: string[]
}

type FieldType = 'name' | 'groupIds'

export const formFields: Record<FieldType, FormFieldInfo> = {
  name: {
    name: 'name',
    label: 'Name',
  },
  groupIds: {
    name: 'groupIds',
    label: 'User Groups',
  },
}

export const sortAddRemoveGroups = (editingUser: UserModel, groupIds: string[]) => {
  const currentGroups = editingUser.groups ?? []
  const removeIds = currentGroups.filter((group) => !groupIds.includes(group))
  const addIds = groupIds.filter((group) => !currentGroups.find((groupId) => groupId === group))

  return {
    removeIds,
    addIds,
  }
}

export const onHandleSubmit = (handleOnClose: () => void, onRefetchData: () => void, editingUser?: UserModel) => async (
  params: UpdateUserModel,
) => {
  const { groupIds } = params
  const userId = editingUser?.id
  if (!groupIds || !editingUser || !userId) return null

  const { removeIds, addIds } = sortAddRemoveGroups(editingUser, groupIds)
  const totalUpdates = removeIds.length + addIds.length

  const updateUserRes = await Promise.all([
    ...removeIds.map((id) => removeMemberFromGroup({ id, userId })),
    ...addIds.map((id) => addMemberToGroup({ id, userId })),
  ])

  const positiveResponses = updateUserRes.filter((res) => Boolean(res))

  if (positiveResponses && positiveResponses.length === totalUpdates) {
    notification.success({
      message: toastMessages.CHANGES_SAVE_SUCCESS,
    })
    handleOnClose()
    return onRefetchData()
  }

  return notification.error({
    message: toastMessages.FAILED_TO_EDIT_USER,
  })
}

export const UpdateUserModal: React.FC<UpdateUserModalProps> = ({
  editingUser,
  setEditingUser,
  onRefetchData,
  orgId,
}) => {
  const handleOnClose = () => setEditingUser(undefined)
  const { groupIds } = formFields

  const groupIdQuery = qs.stringify({ id: window.reapit.config.groupIdsWhitelist }, { indices: false })
  const { data } = useSWR<GroupModelPagedResult | undefined>(
    !orgId ? null : `${URLS.USERS_GROUPS}?${groupIdQuery}&pageSize=999&organisationId=${orgId}`,
  )

  const onSubmit = useCallback(onHandleSubmit(handleOnClose, onRefetchData, editingUser), [editingUser])

  if (!data) return <Loader />
  const { _embedded: listUserGroup } = data
  const userGroupOptions = prepareUserGroupOptions(listUserGroup ?? [])

  if (!editingUser) return null

  return (
    <ModalV2
      visible={!!editingUser}
      destroyOnClose={true}
      onClose={handleOnClose}
      title={`Editing ${editingUser.name}`}
      zIndex={90}
    >
      <p className="mb-4">
        <p>Please use the ‘Users Group’ section below to manage which groups this user belongs to:</p>
      </p>
      <Formik
        initialValues={{
          groupIds: editingUser.groups || [],
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
                  options={userGroupOptions}
                  filterOption={true}
                  optionFilterProp="children"
                />
              </Section>
              <ButtonGroup isCentered hasSpacing>
                <Button variant="secondary" disabled={false} onClick={handleOnClose} type="button">
                  Cancel
                </Button>
                <Button variant="primary" loading={false} type="submit">
                  Save
                </Button>
              </ButtonGroup>
            </Form>
          )
        }}
      </Formik>
    </ModalV2>
  )
}

export default UpdateUserModal
