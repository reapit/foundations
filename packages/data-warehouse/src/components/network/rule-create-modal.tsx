import React, { Dispatch, FC, SetStateAction } from 'react'
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
  InputWrapFull,
  Label,
  Toggle,
} from '@reapit/elements'
import { RulesModel } from '../../types/network'
import { NetworkSelected, useNetworkState } from './use-network-state'

export interface RuleCreateModalProps {
  closeModal: () => void
}

const validationSchema = object({
  name: string()
    .trim()
    .required('Rule name is required')
    .max(50, 'Rule name must be less than 50 characters')
    .matches(
      /^[a-zA-Z][A-Za-z0-9_]{0,49}$/,
      'Rule name must start with a letter and contain only letters, numbers, or the underscore character with no spaces',
    ),
  enabled: boolean(),
})

export const handleCreateRule =
  (
    createRule: SendFunction<Partial<RulesModel>, boolean>,
    refreshRules: () => void,
    closeModal: () => void,
    setNetworkSelected: Dispatch<SetStateAction<NetworkSelected>>,
  ) =>
  async (formValues: Partial<RulesModel>) => {
    const ruleCreated = await createRule(formValues)

    if (ruleCreated) {
      refreshRules()
      closeModal()
      setNetworkSelected({ ruleId: null, ipRuleId: null, ipId: null })
    }
  }

export const RuleCreateModal: FC<RuleCreateModalProps> = ({ closeModal }) => {
  const { customerId, refreshRules, setNetworkSelected } = useNetworkState()

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
    <form onSubmit={handleSubmit(handleCreateRule(createRule, refreshRules, closeModal, setNetworkSelected))}>
      <FormLayout className={elMb11}>
        <InputWrapFull>
          <InputGroup {...register('name')} placeholder="Enter rule name" label="Network Rule Name" />
          {errors.name?.message && <InputError message={errors.name.message} />}
        </InputWrapFull>
        <InputWrapFull>
          <Label>Network Rule Enabled</Label>
          <Toggle id="rule-is-enabled-toggle" {...register('enabled')} hasGreyBg>
            <ElToggleItem>Yes</ElToggleItem>
            <ElToggleItem>No</ElToggleItem>
          </Toggle>
        </InputWrapFull>
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
