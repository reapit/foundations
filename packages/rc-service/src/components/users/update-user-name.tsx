import React, { FC } from 'react'
import { Button, FormLayout, InputGroup, InputWrapFull, Modal, Title, useModal } from '@reapit/elements'
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
        isOpen={modalIsOpen}
        onModalClose={() => {
          closeModal()
        }}
      >
        <form
          onSubmit={handleSubmit(({ name }) => {
            console.log('update name', name)

            updateUser({
              name,
            })
          })}
        >
          <FormLayout>
            <InputWrapFull>
              <Title>Update Name</Title>
            </InputWrapFull>
            <InputWrapFull>
              <InputGroup
                label="Name"
                {...register('name')}
                errorMessage={formErrors?.name?.message}
                icon={formErrors?.name?.message ? 'asterisk' : null}
              />
            </InputWrapFull>
            <InputWrapFull>
              <Button loading={isLoading} disabled={isLoading} intent="primary">
                Update
              </Button>
            </InputWrapFull>
          </FormLayout>
        </form>
      </Modal>
    </>
  )
}
