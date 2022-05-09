import { useReapitConnect } from '@reapit/connect-session'
import React, { useEffect, useState } from 'react'
import { useAppState } from '../state/use-app-state'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { PipelineTabs } from './pipeline-tabs'
import {
  BodyText,
  Button,
  elMb6,
  elMt6,
  FormLayout,
  Input,
  InputError,
  InputGroup,
  InputWrap,
  Label,
  Loader,
  Table,
  TableHeader,
  TableHeadersRow,
  TableRow,
  TableCell,
  Modal,
  Title,
  ButtonGroup,
} from '@reapit/elements'
import { useForm } from 'react-hook-form'
import { cx } from '@linaria/core'
import { useReapitGet, useReapitUpdate } from '@reapit/utils-react'
import { GetActionNames, getActions, UpdateActionNames, updateActions } from '@reapit/utils-common'
import { yupResolver } from '@hookform/resolvers/yup'
import { array, object, ref, SchemaOf, string } from 'yup'
import { PipelineEnvUpdateModal } from './pipeline-environment-update-modal'

const schema: SchemaOf<{
  key: string
  value: any
  existingKeys: string[]
}> = object().shape({
  key: string()
    .matches(/^[a-zA-Z_]+$/, 'Can only container letters and underscores')
    .notOneOf([ref('existingKeys')], 'Key already exists')
    .required('Required - key cannot be blank'),
  value: string().required('Required - env needs a value'),
  existingKeys: array(),
})

export const PipelineEnvironment = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { appId } = useAppState()
  const [isInserting, setIsInserting] = useState<boolean>(false)
  const [modalOpen, setModalOpen] = useState<string | false>(false)
  const [keys, setKeys] = useState<string[]>([])

  const [fetchedKeys, isFetching] = useReapitGet<string[]>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getPipelineEnvironment],
    uriParams: {
      pipelineId: appId,
    },
    headers: {
      Authorization: connectSession?.idToken as string,
    },
    fetchWhenTrue: [connectSession?.idToken],
  })

  const [sending, , func] = useReapitUpdate<{ key: string; value: string; existingKeys: string[] }, void>({
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
    setValue,
    resetField,
  } = useForm<{ key: string; value: any; existingKeys: string[] }>({
    resolver: yupResolver(schema),
    defaultValues: {
      existingKeys: [],
    },
  })

  useEffect(() => {
    if (fetchedKeys) {
      setKeys(fetchedKeys)

      setValue('existingKeys', fetchedKeys)
    }
  }, [fetchedKeys])

  const submitParameter = handleSubmit(async (values) => {
    const result = await func(values)
    if (result) {
      resetField('key')
      resetField('value')
      setIsInserting(false)
      setKeys([...keys, values.key])
    }
  })

  return (
    <>
      <PipelineTabs />
      <BodyText hasGreyText hasSectionMargin>
        Here you can add your Environment variables for your application.
      </BodyText>
      <div className={cx(elMb6, elMt6)}>
        <Table>
          <TableHeadersRow>
            <TableHeader>Key</TableHeader>
            <TableHeader></TableHeader>
          </TableHeadersRow>
          {isFetching ? (
            <TableRow>
              <TableCell>
                <Loader />
              </TableCell>
            </TableRow>
          ) : (
            <>
              {(keys || []).map((key) => (
                <TableRow key={key}>
                  <TableCell>{key}</TableCell>
                  <TableCell>
                    <Button
                      intent="secondary"
                      onClick={() => {
                        resetField('key')
                        resetField('value')
                        setModalOpen(key)
                      }}
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </>
          )}
        </Table>
      </div>
      <Modal isOpen={isInserting} onModalClose={() => setIsInserting(false)} className={cx(elMb6, elMt6)}>
        <Title>Add new Environment Variable</Title>
        <form onSubmit={submitParameter}>
          <FormLayout hasMargin>
            <InputWrap>
              <InputGroup>
                <Label>Key</Label>
                <Input {...register('key')} />
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
            <Button intent="primary" disabled={sending} loading={sending}>
              Create
            </Button>
          </ButtonGroup>
        </form>
      </Modal>
      <Button intent="primary" onClick={() => setIsInserting(!isInserting)}>
        New
      </Button>
      <PipelineEnvUpdateModal
        appId={appId as string}
        connectSession={connectSession}
        keyValue={modalOpen}
        setModalOpen={setModalOpen}
      />
    </>
  )
}
