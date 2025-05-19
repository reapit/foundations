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
  useModal,
  ButtonGroup,
  TableRowContainer,
  elMb11,
  PersistentNotification,
} from '@reapit/elements'
import { useForm } from 'react-hook-form'
import { cx } from '@linaria/core'
import { useReapitGet, useReapitUpdate } from '@reapit/use-reapit-data'
import { GetActionNames, getActions, UpdateActionNames, updateActions } from '@reapit/use-reapit-data'
import { yupResolver } from '@hookform/resolvers/yup'
import { array, object, ref, SchemaOf, string } from 'yup'
import { PipelineEnvUpdateTableRow } from './pipeline-environment-update-table-row'

const schema: SchemaOf<{
  key: string
  value: any
  existingKeys: string[]
}> = object().shape({
  key: string()
    .matches(/^[a-zA-Z_]+$/, 'Can only container letters and underscores')
    .notOneOf([ref('existingKeys')], 'Key already exists')
    .required('Required - key cannot be blank'),
  value: string()
    .required('Required - env needs a value')
    .matches(/^[a-zA-Z0-9\-_]+$/, 'Can only container letters, numbers, underscores and hyphens'),
  existingKeys: array(),
})

export const PipelineEnvironment = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { appId } = useAppState()
  const { Modal, openModal, closeModal } = useModal()
  const [keys, setKeys] = useState<string[]>([])
  const [tableExpanded, setTableExpanded] = useState<false | string>(false)
  const [deletingKeys, setDeletingKeys] = useState<string[]>([])

  const [fetchedKeys, isFetching] = useReapitGet<string[]>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getPipelineEnvironment],
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
    action: updateActions[UpdateActionNames.upsertPipelineEnvironment],
    uriParams: {
      pipelineId: appId,
    },
    method: 'PUT',
    headers: {
      Authorization: connectSession?.idToken as string,
    },
  })

  const [deleting, , deleteParam] = useReapitUpdate<void, void>({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.deletePipelineEnvironment],
    uriParams: {
      pipelineId: appId,
    },
    method: 'DELETE',
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
  } = useForm<{ key: string; value: string; existingKeys: string[] }>({
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

  const submitParameter = handleSubmit(async ({ key, value, existingKeys }) => {
    const result = await func({ key, value, existingKeys })
    if (result) {
      resetField('key')
      resetField('value')
      closeModal()
      setKeys([...keys, key])
    }
  })

  return (
    <>
      <PipelineTabs />
      <BodyText hasGreyText>
        You can add your <strong>Environment Variables</strong> for your application here. If you supply any key value
        pair it will be written to the <code>process.ENV</code> object at compile time when building your app.
      </BodyText>
      <BodyText hasGreyText>
        All variables are stored in a secure and encrypted format, however if you are building a web app environment
        variables are inherently insecure. As such, you should only store values that can be exposed on the client side.
      </BodyText>
      <BodyText hasGreyText>
        Currently your Environment Variables are not exposed over an API once you have stored them for security reasons.
        If you need to confirm a variable value, it is advised to update it and re-deploy the application.
      </BodyText>
      {isFetching ? (
        <Loader />
      ) : (
        <>
          {keys.length ? (
            <Table className={elMb11}>
              <TableHeadersRow>
                <TableHeader>Variable Key</TableHeader>
                <TableHeader>Update Variable</TableHeader>
              </TableHeadersRow>
              {keys.map((key) => (
                <TableRowContainer key={key}>
                  <TableRow>
                    <TableCell>{key}</TableCell>
                    <TableCell>
                      <ButtonGroup>
                        <Button
                          intent="default"
                          onClick={() => {
                            resetField('key')
                            resetField('value')
                            setTableExpanded(key === tableExpanded ? false : key)
                          }}
                        >
                          Update
                        </Button>
                        <Button
                          intent="danger"
                          loading={deleting && deletingKeys.includes(key)}
                          disabled={deleting && deletingKeys.includes(key)}
                          onClick={async () => {
                            setDeletingKeys([...deletingKeys, key])
                            await deleteParam(undefined, {
                              uriParams: {
                                key,
                              },
                            })
                            setDeletingKeys(deletingKeys.filter((filterKey) => filterKey !== key))
                            setKeys(keys.filter((filterKey) => filterKey !== key))
                          }}
                        >
                          Delete
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                  <PipelineEnvUpdateTableRow
                    appId={appId as string}
                    connectSession={connectSession}
                    keyValue={key}
                    isOpen={typeof tableExpanded === 'string' && key === tableExpanded}
                  />
                </TableRowContainer>
              ))}
            </Table>
          ) : (
            <PersistentNotification className={elMb11} intent="primary" isExpanded isFullWidth isInline>
              No environment variables currently configured for your pipeline. You can create an environment variable
              below.
            </PersistentNotification>
          )}
          <ButtonGroup alignment="left">
            <Button intent="primary" onClick={openModal}>
              Create Environment Variable
            </Button>
          </ButtonGroup>
        </>
      )}
      <Modal title="Add new Environment Variable" className={cx(elMb6, elMt6)}>
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
          <ButtonGroup alignment="right">
            <Button intent="default" onClick={closeModal}>
              Close
            </Button>
            <Button intent="primary" type="submit" disabled={sending} loading={sending}>
              Create
            </Button>
          </ButtonGroup>
        </form>
      </Modal>
    </>
  )
}
