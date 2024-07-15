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

export interface RuleCreateModalProps {
  closeModal: () => void
}

const validationSchema = object({
  name: string()
    .trim()
    .required('Rule name is required')
    .max(50, 'Rule name must be less than 50 characters')
    .matches(
      /^[A-Za-z][A-Za-z0-9]*$/,
      'Rule name must start with a letter and contain only letters and numbers with no spaces',
    ),
  enabled: boolean(),
})

export const handleCreateRule =
  (createRule: SendFunction<Partial<RulesModel>, boolean>, refreshRules: () => void, closeModal: () => void) =>
  async (formValues: Partial<RulesModel>) => {
    const ruleCreated = await createRule(formValues)

    if (ruleCreated) {
      refreshRules()
      closeModal()
    }
  }

export const RuleCreateModal: FC<RuleCreateModalProps> = ({ closeModal }) => {
  const { customerId, refreshRules } = useNetworkState()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<RulesModel>>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: '',
      enabled: false,
    },
  })

  const [, , createRule] = useReapitUpdate<Partial<RulesModel>, boolean>({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.createRule],
    method: 'POST',
    uriParams: {
      customerId,
    },
  })

  return (
    <form onSubmit={handleSubmit(handleCreateRule(createRule, refreshRules, closeModal))}>
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
