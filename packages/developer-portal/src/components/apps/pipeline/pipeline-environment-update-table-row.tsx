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
  Subtitle,
  TableExpandableRow,
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
  value: string()
    .matches(/^[a-zA-Z0-9_]+$/, 'Can only container letters and underscores')
    .required('Required - env needs a value'),
})

export const PipelineEnvUpdateTableRow = ({
  appId,
  connectSession,
  keyValue,
  isOpen,
}: {
  appId: string
  connectSession: ReapitConnectSession | null
  keyValue: string | false
  isOpen: boolean
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
  } = useForm<{ key: string; value: string }>({
    resolver: yupResolver(updateSchema),
  })

  const submitParameter = handleSubmit(async (values) => {
    const result = await func({
      key: keyValue as string,
      value: values.value,
    })
    if (result) {
      reset()
    }
  })

  return (
    <TableExpandableRow isOpen={isOpen}>
      <div className={cx(elMb6, elMt6)}>
        <form onSubmit={submitParameter}>
          <Subtitle>Update Environment Variable</Subtitle>
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
    </TableExpandableRow>
  )
}
