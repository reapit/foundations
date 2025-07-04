import React from 'react'
import {
  Modal,
  useModal,
  Button,
  FormLayout,
  InputWrapFull,
  Select,
  Label,
  Input,
  InputError,
  TextArea,
  ModalHeader,
  Title,
  ToggleRadio,
} from '@reapit/elements'
import { FC } from 'react'
import { UserModel } from '@reapit/foundations-ts-definitions'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { boolean, object, string } from 'yup'
import { UpdateActionNames, updateActions, useReapitUpdate } from '@reapit/use-reapit-data'
import { reapitConnectBrowserSession } from '../../core/connect-session'

type UserStatusToggle = {
  category: string
  reason: string
  status: string
  notify: boolean
}

const validationSchema = object().shape({
  reason: string().trim(),
  category: string().required(),
  notify: boolean(),
  status: string().required(),
})

export const UpdateUserActive: FC<{ user: UserModel }> = ({ user }) => {
  const { modalIsOpen, closeModal, openModal } = useModal()

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      category: '',
      reason: '',
      notify: false,
      status: !user.inactive ? 'inactive' : 'active',
    },
    resolver: yupResolver(validationSchema) as any,
  })

  const [userUpdateLoading, , updateUser] = useReapitUpdate<UserStatusToggle, boolean>({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.userActiveToggleStatus],
    method: 'POST',
    uriParams: {
      id: user.id,
    },
  })

  return (
    <>
      <Button intent="primary" onClick={() => openModal()}>
        Update Status
      </Button>
      <Modal isOpen={modalIsOpen} onModalClose={closeModal}>
        <ModalHeader>
          <Title>Update User Status {user.email}</Title>
        </ModalHeader>
        <form
          onSubmit={handleSubmit(async (values) => {
            const result = await updateUser(values)

            if (result) closeModal()
          })}
        >
          <FormLayout>
            <InputWrapFull>
              <ToggleRadio
                {...register('status')}
                options={[
                  {
                    id: 'active',
                    value: 'active',
                    text: 'Active',
                    isChecked: !user.inactive || false,
                  },
                  {
                    id: 'inactive',
                    value: 'inactive',
                    text: 'InActive',
                    isChecked: user.inactive || false,
                  },
                ]}
              />
            </InputWrapFull>
            <InputWrapFull>
              <Label>Reason</Label>
              <Select {...register('category')}>
                <option value={''}>Select a Reason</option>
                <option value={'Suspicious Activity'}>Suspicious Activity</option>
                <option value={'User Request'}>User Request</option>
                <option value={'Another Reason'}>Another Reason</option>
              </Select>
              {errors.category && errors?.category?.message && <InputError message={errors.category.message} />}
            </InputWrapFull>
            <InputWrapFull>
              <Label>Notes</Label>
              <TextArea {...register('reason')} placeholder="notes about this active"></TextArea>
            </InputWrapFull>
            <InputWrapFull>
              <Label>Notify user</Label>
              <Input type="checkbox" {...register('notify')} />
            </InputWrapFull>
            <InputWrapFull>
              <Button disabled={userUpdateLoading} loading={userUpdateLoading} intent="primary">
                Update
              </Button>
            </InputWrapFull>
          </FormLayout>
        </form>
      </Modal>
    </>
  )
}
