import React, { FC } from 'react'
import {
  BodyText,
  Button,
  ButtonGroup,
  FormLayout,
  Icon,
  InputGroup,
  InputWrapFull,
  Modal,
  Title,
  useModal,
} from '@reapit/elements'
import { UpdateActionNames, updateActions, useReapitUpdate } from '@reapit/use-reapit-data'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { UserModel } from '@reapit/foundations-ts-definitions'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { object, string } from 'yup'
import styled from 'styled-components'

const InlineIcon = styled(Icon)`
  margin-right: 0 !important;
`

const Label = styled.span`
  display: inline-flex;
  align-items: center;
  width: 100%;
  cursor: pointer;
`

const validationSchema = object().shape({
  name: string().trim().required('Required').max(150, 'Limit of 150 characters'),
})

export const UpdateUserName: FC<{ user: UserModel }> = ({ user }) => {
  const { modalIsOpen, openModal, closeModal } = useModal()

  const [isLoading, , updateUser] = useReapitUpdate<UserModel, UserModel>({
    uriParams: {
      userId: user.id,
    },
    action: updateActions[UpdateActionNames.updateUser],
    reapitConnectBrowserSession,
    method: 'PATCH',
  })

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<{ name?: string }>({
    resolver: yupResolver(validationSchema) as any,
    defaultValues: {
      name: user.name,
    },
  })

  return (
    <>
      <Label onClick={() => openModal()}>
        <span style={{ flex: 1 }}>{user.name}</span>
        <InlineIcon icon="edit" intent="secondary" style={{ marginRight: 0 }} />
      </Label>
      <Modal
        title="Update Name"
        isOpen={modalIsOpen}
        onModalClose={() => {
          closeModal()
        }}
      >
        <BodyText>Use this form to make changes to the name of the user in Reapit Connect</BodyText>
        <form
          onSubmit={handleSubmit(({ name }) => {
            updateUser({
              name,
            })
          })}
        >
          <FormLayout>
            <InputWrapFull>
              <InputGroup
                {...register('name')}
                errorMessage={formErrors?.name?.message}
                icon={formErrors?.name?.message ? 'asterisk' : null}
              />
            </InputWrapFull>
            <InputWrapFull>
              <ButtonGroup alignment="center">
                <Button loading={isLoading} disabled={isLoading} intent="primary">
                  Update
                </Button>
                <Button intent="default" onClick={closeModal}>
                  Cancel
                </Button>
              </ButtonGroup>
            </InputWrapFull>
          </FormLayout>
        </form>
      </Modal>
    </>
  )
}
