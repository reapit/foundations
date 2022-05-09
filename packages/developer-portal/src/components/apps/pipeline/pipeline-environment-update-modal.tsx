import { yupResolver } from '@hookform/resolvers/yup'
import { cx } from '@linaria/core'
import { ReapitConnectSession } from '@reapit/connect-session'
import {
  Button,
  ButtonGroup,
  elMb6,
  elMt6,
  FormLayout,
  Input,
  InputError,
  InputGroup,
  InputWrap,
  Label,
  Modal,
  Title,
} from '@reapit/elements'
import { UpdateActionNames, updateActions } from '@reapit/utils-common'
import { useReapitUpdate } from '@reapit/utils-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { object, SchemaOf, string } from 'yup'
import { reapitConnectBrowserSession } from '../../../core/connect-session'

const updateSchema: SchemaOf<{
  value: any
}> = object().shape({
  value: string().required('Required - env needs a value'),
})

export const PipelineEnvUpdateModal = ({
  appId,
  connectSession,
  keyValue,
  setModalOpen,
}: {
  appId: string
  connectSession: ReapitConnectSession | null
  keyValue: string | false
  setModalOpen: (value: string | false) => void
}) => {
  const [sending, , func] = useReapitUpdate<{ key: string; value: string }, void>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.upsertPipelineEnvironment],
    uriParams: {
      pipelineId: appId,
    },
    method: 'PUT',
    headers: {
      Authorization: connectSession?.idToken as string,
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ key: string; value: any }>({
    resolver: yupResolver(updateSchema),
  })

  const submitParameter = handleSubmit(async (values) => {
    const result = await func({
      key: keyValue as string,
      value: values.value,
    })
    if (result) {
      reset()
      setModalOpen(false)
    }
  })

  return (
    <Modal
      isOpen={Boolean(keyValue)}
      onModalClose={() => {
        reset()
        setModalOpen(false)
      }}
    >
      <div className={cx(elMb6, elMt6)}>
        <form onSubmit={submitParameter}>
          <Title>Update Environment Variable</Title>
          <FormLayout hasMargin>
            <InputWrap>
              <InputGroup>
                <Label>Key</Label>
                <Input {...register('key')} value={keyValue || ''} disabled={true} />
                {errors.key?.message && <InputError message={errors.key.message} />}
              </InputGroup>
            </InputWrap>
            <InputWrap>
              <InputGroup>
                <Label>Value</Label>
                <Input {...register('value')} />
                {errors.value?.message && <InputError message={errors.value.message} />}
              </InputGroup>
            </InputWrap>
          </FormLayout>
          <ButtonGroup>
            <Button loading={sending} disabled={sending} intent="primary">
              Save
            </Button>
          </ButtonGroup>
        </form>
      </div>
    </Modal>
  )
}
