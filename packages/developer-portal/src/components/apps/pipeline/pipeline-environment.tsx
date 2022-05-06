import { useReapitConnect } from '@reapit/connect-session'
import React, { useState } from 'react'
import { useAppState } from '../state/use-app-state'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { PipelineTabs } from './pipeline-tabs'
import {
  BodyText,
  Button,
  elMb6,
  elMt6,
  FormLayout,
  Icon,
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
} from '@reapit/elements'
import { useForm } from 'react-hook-form'
import { cx } from '@linaria/core'
import { useReapitGet } from '@reapit/utils-react'
import { GetActionNames, getActions } from '@reapit/utils-common'

export const PipelineEnvironment = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { appId } = useAppState()
  const [isInserting, setIsInserting] = useState<boolean>(false)

  const [keys, isFetching] = useReapitGet<string[]>({
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

  const {
    register,
    formState: { errors },
  } = useForm()

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
              <Loader />
            </TableRow>
          ) : (
            <>
              {(keys || []).map((key) => (
                <TableRow key={key}>
                  <TableCell>{key}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
            </>
          )}
        </Table>
      </div>
      {isInserting && (
        <div className={cx(elMb6, elMt6)}>
          <form>
            <FormLayout>
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
              <InputWrap>
                <Button intent="primary">Save</Button>
              </InputWrap>
            </FormLayout>
          </form>
        </div>
      )}
      <Button intent="primary" onClick={() => setIsInserting(!isInserting)}>
        <Icon intent="neutral" icon={!isInserting ? 'addSystem' : 'closeSystem'} />
      </Button>
    </>
  )
}
