import React from 'react'
import useSWR from 'swr'
import { FormFieldInfo } from '@reapit/utils'
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
  SelectOption,
  notification,
} from '@reapit/elements'
import { UserModel, GroupModel } from '@reapit/foundations-ts-definitions'
import { URLS } from '../../../constants/api'
import { updateUser } from '../../../services/user'
import { errorMessages } from '../../../constants/errorMessages'

export interface UpdateUserModalProps {
  editingUser: UserModel | undefined
  setEditingUser: React.Dispatch<React.SetStateAction<UserModel | undefined>>
  onRefetchData: Function
}

export interface UpdateUserModel {
  name: string
  groupIds: string[]
}

export type FieldType = 'name' | 'groupIds'

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

export const prepareGroupOptions: (data: GroupModel[]) => SelectOption[] = data =>
  data.map((userGroup: GroupModel) => {
    const { id } = userGroup

    return {
      label: id,
      value: id,
    } as SelectOption
  })

export const UpdateUserModal: React.FC<UpdateUserModalProps> = ({ editingUser, setEditingUser, onRefetchData }) => {
  const handleOnClose = () => setEditingUser(undefined)
  const { name, groupIds } = formFields

  const { data }: any = useSWR(`${URLS.USERS_GROUPS}`)
  if (!data) return <Loader />
  const { _embedded: listUserGroup } = data
  const userGroupOptions = prepareGroupOptions(listUserGroup)

  const onSubmit = async (params: UpdateUserModel) => {
    const { name, groupIds } = params
    const updateUserRes = await updateUser({ name, groupIds }, editingUser?.id || '')

    if (!updateUserRes) {
      notification.success({
        message: errorMessages.EDIT_USER_SUCCESS,
        placement: 'bottomRight',
      })
      handleOnClose()
      return onRefetchData()
    }

    return notification.error({
      message: updateUserRes.description || errorMessages.FAILED_TO_EDIT_USER,
      placement: 'bottomRight',
    })
  }

  if (!editingUser) return null

  return (
    <ModalV2 visible={!!editingUser} destroyOnClose={true} onClose={handleOnClose} title="Manage User" zIndex={90}>
      <H5>{`Editing ${editingUser.name}`}</H5>
      <p>
        Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.
      </p>
      <Formik
        initialValues={{
          name: editingUser.name || '',
          groupIds: editingUser.groups || [],
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
                  id={groupIds.name}
                  placeholder="Please select"
                  name={groupIds.name}
                  labelText={groupIds.label}
                  options={userGroupOptions}
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

export default UpdateUserModal
