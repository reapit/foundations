import React, { FC } from 'react'
import { boolean, object, string } from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { SendFunction, useReapitUpdate, UpdateActionNames, updateActions } from '@reapit/use-reapit-data'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import {
  Button,
  ButtonGroup,
  elMb11,
  ElToggleItem,
  FormLayout,
  InputError,
  InputGroup,
  InputWrap,
  Label,
  Toggle,
} from '@reapit/elements'
import { RulesModel } from '../../types/network'
import { useNetworkState } from './use-network-state'

interface RuleUpdateModalProps {
  closeModal: () => void
}

const validationSchema = object({
  name: string().required('Rule name is required'),
  enabled: boolean(),
})

export const handleUpdateRule =
  (updateRule: SendFunction<Partial<RulesModel>, boolean>, refreshRules: () => void, closeModal: () => void) =>
  async (formValues: Partial<RulesModel>) => {
    const ruleUpdated = await updateRule(formValues)

    if (ruleUpdated) {
      refreshRules()
      closeModal()
    }
  }

export const RuleUpdateModal: FC<RuleUpdateModalProps> = ({ closeModal }) => {
  const {
    networkSelected: { ruleId },
    customerId,
    refreshRules,
    rules,
  } = useNetworkState()

  const rule = rules?._embedded?.find((rule) => rule.id === ruleId)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<RulesModel>>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: rule?.name || '',
      enabled: rule?.enabled || false,
    },
  })

  const [, , updateRule] = useReapitUpdate<Partial<RulesModel>, boolean>({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.updateRule],
    method: 'PUT',
    uriParams: {
      ruleId: rule?.id,
      customerId,
    },
  })

  return (
    <form onSubmit={handleSubmit(handleUpdateRule(updateRule, refreshRules, closeModal))}>
      <FormLayout className={elMb11}>
        <InputWrap>
          <InputGroup {...register('name')} placeholder="Enter rule name" label="Network Rule Name" />
          {errors.name?.message && <InputError message={errors.name.message} />}
        </InputWrap>
        <InputWrap>
          <Label>Network Rule Enabled</Label>
          <Toggle id="rule-is-enabled-toggle" {...register('enabled')} hasGreyBg>
            <ElToggleItem>Yes</ElToggleItem>
            <ElToggleItem>No</ElToggleItem>
          </Toggle>
        </InputWrap>
      </FormLayout>
      <ButtonGroup alignment="center">
        <Button intent="default" type="button" onClick={closeModal}>
          Cancel
        </Button>
        <Button intent="primary" type="submit">
          Update
        </Button>
      </ButtonGroup>
    </form>
  )
}
