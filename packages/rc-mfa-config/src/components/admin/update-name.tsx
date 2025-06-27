import {
  Button,
  FormLayout,
  InputGroup,
  InputWrapFull,
  Modal,
  PersistantNotification,
  useModal,
} from '@reapit/elements'
import { UpdateActionNames, updateActions, useReapitUpdate } from '@reapit/use-reapit-data'
import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { reapitConnectBrowserSession } from '../../core/connect-session'

export const UpdateNameModal: FC<{ userId?: string; name?: string }> = ({ userId, name }) => {
  const { modalIsOpen, closeModal, openModal } = useModal()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: { name },
  })

  const [loading, , updateUser] = useReapitUpdate({
    action: updateActions[UpdateActionNames.updateUser],
    reapitConnectBrowserSession,
    uriParams: {
      userId,
    },
    method: 'PATCH',
  })

  return (
    <>
      <Button intent="primary" onClick={openModal}>
        Update User&apos;s Name
      </Button>
      <Modal title="Update Name" isOpen={modalIsOpen} onModalClose={closeModal}>
        {!userId ? (
          <PersistantNotification intent="danger">This user is not able to be updated.</PersistantNotification>
        ) : (
          <form
            onSubmit={handleSubmit(async (values) => {
              await updateUser(values)
              closeModal()
            })}
          >
            <FormLayout>
              <InputWrapFull>
                <InputGroup label="Name" {...register('name')} errorMessage={errors?.name?.message} />
              </InputWrapFull>
              <InputWrapFull>
                <Button disabled={loading} loading={loading} intent="primary">
                  Update
                </Button>
              </InputWrapFull>
            </FormLayout>
          </form>
        )}
      </Modal>
    </>
  )
}
