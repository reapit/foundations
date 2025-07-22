import React, { useState } from 'react'
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
  elMb11,
  ButtonGroup,
  InputGroup,
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
  const [canSendNotifications, setCanSendNotifications] = useState(false)
  const [canSubmit, setCanSubmit] = useState(false)

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
      <Modal title="Update User Status" isOpen={modalIsOpen} onModalClose={closeModal}>
        <form
          onSubmit={handleSubmit(async (values) => {
            const result = await updateUser(values)

            if (result) closeModal()
          })}
        >
          <FormLayout className={elMb11}>
            <InputGroup>
              <Label>Status</Label>
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
                    text: 'Inactive',
                    isChecked: user.inactive || false,
                  },
                ]}
              />
            </InputGroup>
            <InputWrapFull>
              <InputGroup>
                <Label>Reason</Label>
                <Select
                  {...register('category')}
                  onChange={(e) => {
                    setCanSendNotifications(e.target.value === 'Suspicious Activity')
                  }}
                >
                  <option value={''}>Select a Reason</option>
                  <option value={'Suspicious Activity'}>Suspicious Activity</option>
                  <option value={'User Request'}>User Request</option>
                  <option value={'Another Reason'}>Another Reason</option>
                </Select>
                {errors.category && errors?.category?.message && <InputError message={errors.category.message} />}
              </InputGroup>
            </InputWrapFull>
            <InputWrapFull>
              <InputGroup>
                <Label>Notes</Label>
                <TextArea
                  type="text"
                  {...register('reason')}
                  placeholder="Internal notes about this status change. This information is not included in email notifications but is visible to other employees using the Status History functionality"
                ></TextArea>
              </InputGroup>
            </InputWrapFull>
            <InputWrapFull>
              <InputGroup>
                <Label>Send email notification to user</Label>
                <Input type="checkbox" {...register('notify')} disabled={!canSendNotifications} />
              </InputGroup>
            </InputWrapFull>
          </FormLayout>
          <ButtonGroup alignment="right">
            <Button onClick={closeModal}>Cancel</Button>
            <Button
              disabled={userUpdateLoading || !canSubmit}
              loading={userUpdateLoading}
              intent="primary"
              type="submit"
            >
              Update
            </Button>
          </ButtonGroup>
        </form>
      </Modal>
    </>
  )
}
