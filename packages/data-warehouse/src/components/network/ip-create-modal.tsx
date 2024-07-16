import React, { FC } from 'react'
import { number, object, string } from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { SendFunction, useReapitUpdate, UpdateActionNames, updateActions } from '@reapit/use-reapit-data'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { Button, ButtonGroup, elMb11, FormLayout, InputError, InputGroup, InputWrap } from '@reapit/elements'
import { IpsModel } from '../../types/network'
import { useNetworkState } from './use-network-state'

export interface IpCreateModalProps {
  closeModal: () => void
}

const validationSchema = object({
  ipAddress: string()
    .trim()
    .required('IP address is required')
    .matches(
      // IP whitelist Regex
      // eslint-disable-next-line max-len
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
      'The IP address must be in IPv4 notation (e.g. 192.168.0.1)',
    ),
  cidr: number().max(32).optional(),
})

export const handleCreateIp =
  (createIp: SendFunction<Partial<IpsModel>, boolean>, refreshIps: () => void, closeModal: () => void) =>
  async (formValues: Partial<IpsModel>) => {
    const ruleCreated = await createIp(formValues)

    if (ruleCreated) {
      refreshIps()
      closeModal()
    }
  }

export const IpCreateModal: FC<IpCreateModalProps> = ({ closeModal }) => {
  const { networkSelected, refreshIps, customerId } = useNetworkState()

  const ruleId = networkSelected?.ipRuleId

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<IpsModel>>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      ipAddress: '',
      cidr: 32,
    },
  })

  const [, , createIp] = useReapitUpdate<Partial<IpsModel>, boolean>({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.createIp],
    method: 'POST',
    uriParams: {
      customerId,
      ruleId,
    },
  })

  return (
    <form onSubmit={handleSubmit(handleCreateIp(createIp, refreshIps, closeModal))}>
      <FormLayout className={elMb11}>
        <InputWrap>
          <InputGroup
            {...register('ipAddress')}
            placeholder="Enter IP address in IPv4 notation"
            label="Whitelisted IP Address"
          />
          {errors.ipAddress?.message && <InputError message={errors.ipAddress.message} />}
        </InputWrap>
        <InputWrap>
          <InputGroup {...register('cidr')} placeholder="Enter optional CIDR suffix e.g. 32" label="CIDR Suffix" />
          {errors.cidr?.message && <InputError message={errors.cidr.message} />}
        </InputWrap>
      </FormLayout>
      <ButtonGroup alignment="right">
        <Button intent="default" type="button" onClick={closeModal}>
          Cancel
        </Button>
        <Button intent="primary" type="submit">
          Create
        </Button>
      </ButtonGroup>
    </form>
  )
}
