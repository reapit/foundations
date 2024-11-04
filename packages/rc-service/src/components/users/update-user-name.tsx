import React, { FC } from 'react'
import {
  BodyText,
  Button,
  ButtonGroup,
  FormLayout,
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
      <Button intent="primary" onClick={() => openModal()}>
        Update User&apos;s Name
      </Button>
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
