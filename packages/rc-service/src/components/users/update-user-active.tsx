import React, { useEffect, useState } from 'react'
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
  Icon,
} from '@reapit/elements'
import { FC } from 'react'
import { UserModel } from '@reapit/foundations-ts-definitions'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { boolean, object, string } from 'yup'
import { UpdateActionNames, updateActions, useReapitUpdate } from '@reapit/use-reapit-data'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import styled from 'styled-components'
import { UserStatusHistory } from './user-status-history'

const MultiButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

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
  const [status, setStatus] = useState(user.inactive ? 'inactive' : 'active')

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: {
      category: '',
      reason: '',
      notify: false,
      status: user.inactive ? 'inactive' : 'active',
    },
    resolver: yupResolver(validationSchema) as any,
  })

  const [category, reason] = watch(['category', 'reason'])

  useEffect(() => {
    console.log('Category:', category, 'Reason:', reason)
    setCanSendNotifications(category === 'Suspicious Activity')
    setCanSubmit(category !== '' && reason !== '')
  }, [category, reason])

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
      <MultiButtonContainer>
        <Button
          intent={status === 'inactive' ? 'danger' : 'success'}
          onClick={() => openModal()}
          style={{ textTransform: 'capitalize' }}
        >
          {status}
        </Button>
        <UserStatusHistory user={user} />
      </MultiButtonContainer>
      <Modal title="Update User Status" isOpen={modalIsOpen} onModalClose={closeModal}>
        <form
          onSubmit={handleSubmit(async (values) => {
            const result = await updateUser(values)

            if (result) {
              setStatus(values.status)
            }

            if (result) closeModal()
          })}
        >
          <FormLayout className={elMb11}>
            <InputWrapFull>
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
            </InputWrapFull>
            <InputWrapFull>
              <InputGroup>
                <Label>Reason</Label>
                <Select {...register('category')}>
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
