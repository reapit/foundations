import React, { useState } from 'react'
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
  FadeIn,
  Table,
  ButtonGroup,
} from '@reapit/elements'
import {
  GroupMembershipModelPagedResult,
  GroupModel,
  UserModel,
  UserModelPagedResult,
  GroupMembershipModel,
} from '../../../types/organisations-schema'
import { URLS } from '../../../constants/api'
import { addMemberToGroup, removeMemberFromGroup } from '../../../services/user'
import { toastMessages } from '../../../constants/toast-messages'

export interface UpdateUserGroupModalProps {
  editingUserGroup: GroupModel | undefined
  setEditingUserGroup: React.Dispatch<React.SetStateAction<GroupModel | undefined>>
  onRefetchData: () => void
  orgId: string
}

interface UpdateUserGroupModel {
  userId: string[]
}

type FieldType = 'groupIds'

export const formFields: Record<FieldType, FormFieldInfo> = {
  groupIds: {
    name: 'userId',
    label: 'Add Group Members',
  },
}

export const prepareGroupOptions: (data: GroupModel[]) => SelectOption[] = (data: UserModel[]) =>
  data.map((userGroupGroup: UserModel) => {
    const { id, name } = userGroupGroup

    return {
      label: name,
      value: id,
      description: userGroupGroup.name,
    } as SelectOption
  })

const addUserToGroup = async (id: string, userId: string) => {
  const addUserRes = await addMemberToGroup({ id, userId })
  return addUserRes
}

const removeUserFromGroup = async (id: string, userId: string) => {
  const removeUserRes = await removeMemberFromGroup({ id, userId })
  return removeUserRes
}

export const onHandleSubmit = (
  handleOnClose: () => void,
  onRefetchData: () => void,
  mutate: () => void,
  removeUser: string[],
  listUserGroupMember?: GroupMembershipModel[],
  editingUserGroup?: GroupModel,
) => async (params: UpdateUserGroupModel) => {
  const id = editingUserGroup?.id || ''
  const userId = params.userId

  for (const user of userId) {
    if (!listUserGroupMember?.find((userGroup: UserModel) => userGroup.id === user)) {
      const addUserRes = await addUserToGroup(id, user)
      if (!addUserRes) {
        return notification.error({
          message: toastMessages.FAILED_TO_EDIT_USER_GROUP,
        })
      }
    }
  }

  for (const user of removeUser) {
    if (!userId.find((addUser: string) => addUser === user)) {
      const removeUserRes = await removeUserFromGroup(id, user)
      if (!removeUserRes) {
        return notification.error({
          message: toastMessages.FAILED_TO_EDIT_USER_GROUP,
        })
      }
    }
  }

  notification.success({
    message: toastMessages.CHANGES_SAVE_SUCCESS,
  })
  handleOnClose()
  mutate()
  return onRefetchData()
}

export const getUserOptions = (listUserGroup: UserModel[], listUserGroupMember: UserModel[]) =>
  listUserGroup.filter(
    (member: UserModel) => !listUserGroupMember.find((userGroup: UserModel) => userGroup.id === member.id),
  )

export const UpdateUserGroupModal: React.FC<UpdateUserGroupModalProps> = ({
  editingUserGroup,
  setEditingUserGroup,
  onRefetchData,
  orgId,
}) => {
  const [removeUser, setRemoveUser] = useState<string[]>([])
  const id = editingUserGroup?.id
  const handleOnClose = () => {
    setEditingUserGroup(undefined)
    setRemoveUser([])
  }
  const { groupIds } = formFields

  const { data } = useSWR<UserModelPagedResult | undefined>(`${URLS.USERS}?pageSize=999&organisationId=${orgId}`)

  const { data: groupMembers, mutate } = useSWR<GroupMembershipModelPagedResult | undefined>(
    id && orgId ? `${URLS.USERS_GROUPS}/${id}/members?pageSize=999&organisationId=${orgId}` : null,
  )

  if (!editingUserGroup) return null
  if (!data) return <Loader />
  if (!groupMembers) return <Loader />
  const { _embedded: listUserGroup } = data
  const { _embedded: listUserGroupMember } = groupMembers
  const onSubmit = onHandleSubmit(
    handleOnClose,
    onRefetchData,
    mutate,
    removeUser,
    listUserGroupMember,
    editingUserGroup,
  )

  const tableData = listUserGroupMember?.filter((member: UserModel) => removeUser.indexOf(member.id || '') === -1) || []
  const userGroupGroupOptions = prepareGroupOptions(getUserOptions(listUserGroup || [], tableData))

  const RemoveButton = ({
    cell: {
      row: { original },
    },
  }) => (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault()
        removeUser.push(original.id)
        setRemoveUser([...removeUser])
      }}
    >
      Remove
    </a>
  )

  const columns = [
    { Header: 'Name', accessor: 'name' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Action', Cell: RemoveButton },
  ]

  return (
    <ModalV2
      visible={!!editingUserGroup}
      destroyOnClose={true}
      onClose={handleOnClose}
      title={`Editing ${editingUserGroup.id}`}
      zIndex={90}
    >
      <p className="mb-4">
        <p>
          The list below contains all available member groups for your organisation. You can manage users associated to
          each group by selecting ‘Manage’
        </p>
      </p>
      <Formik
        initialValues={{
          userId: [],
        }}
        onSubmit={onSubmit}
      >
        {() => {
          return (
            <Form noValidate={true}>
              <Section hasPadding={false} hasMargin={false}>
                <FadeIn>
                  <div className="mb-4">
                    <Table expandable scrollable={true} data={tableData} columns={columns} maxHeight={400} />
                  </div>
                </FadeIn>
                <DropdownSelect
                  mode="multiple"
                  id={groupIds.name}
                  placeholder="Please select"
                  name={groupIds.name}
                  labelText={groupIds.label}
                  options={userGroupGroupOptions}
                  filterOption={true}
                  optionFilterProp="children"
                />
              </Section>
              <ButtonGroup hasSpacing isCentered>
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

export default UpdateUserGroupModal
