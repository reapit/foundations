import React, { useState, useEffect, useCallback, FC, ChangeEvent, Dispatch, SetStateAction } from 'react'
import { createOfficeGroup, OFFICE_IN_USE_ERROR } from '../../../services/office'
import { toastMessages } from '../../../constants/toast-messages'
import { prepareOfficeOptions } from '../../../utils/prepare-options'
import { OfficeModel, OfficeModelPagedResult } from '@reapit/foundations-ts-definitions'
import debounce from 'just-debounce-it'
import useSWR, { useSWRConfig } from 'swr'
import { URLS } from '../../../constants/api'
import {
  BodyText,
  Button,
  ButtonGroup,
  elFadeIn,
  ElToggleItem,
  FormLayout,
  InputGroup,
  InputWrap,
  InputWrapFull,
  Label,
  MultiSelectInput,
  MultiSelectOption,
  PersistentNotification,
  StepsVertical,
  Title,
  Toggle,
  useSnack,
} from '@reapit/elements'
import { boolean, object, string } from 'yup'
import errorMessages from '../../../constants/error-messages'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, UseFormTrigger, UseFormGetValues } from 'react-hook-form'
import { History } from 'history'
import Routes from '../../../constants/routes'
import { history } from '../../../core/router'
import { useOrgId } from '../../../utils/use-org-id'
import { fetcherWithClientCode } from '../../../utils/fetcher'
import { ScopedMutator } from 'swr/dist/types'

export interface OfficeGroupCreateProps {}

export const validationSchema = object().shape({
  name: string().trim().required(errorMessages.FIELD_REQUIRED),
  officeIds: string(),
  status: boolean(),
})

interface CreateOfficeGroupSchema {
  name: string
  officeIds: string
  status: boolean
}

export const onHandleSubmit =
  (
    history: History,
    orgId: string | null,
    mutate: ScopedMutator<any>,
    success: (message: string) => void,
    error: (message: string, delay?: number) => void,
  ) =>
  async (params: CreateOfficeGroupSchema) => {
    if (orgId) {
      const { name, officeIds: idsList } = params
      const officeIds = idsList.toString()
      const status = params.status ? 'active' : 'inactive'
      const createdOffice = await createOfficeGroup({ name, officeIds, status }, orgId)

      if (createdOffice && createdOffice === OFFICE_IN_USE_ERROR) {
        return error(toastMessages.OFFICE_ALREADY_ASSIGNED_CREATE, 10000)
      }

      if (createdOffice) {
        // Set timeout as a workaround for RDS replication error.
        return setTimeout(() => {
          success(toastMessages.CREATE_OFFICE_GROUP_SUCCESS)
          mutate(`${URLS.ORGANISATIONS}/${orgId}/${URLS.OFFICES_GROUPS}`)
          history.push(Routes.OFFICES_GROUPS)
        }, 1000)
      }

      error(toastMessages.FAILED_TO_CREATE_OFFICE_GROUP)
    }
  }

export const handleSwitchStep =
  (
    selectedStep: string,
    trigger: UseFormTrigger<CreateOfficeGroupSchema>,
    setSelectedStep: Dispatch<SetStateAction<string>>,
  ) =>
  () => {
    const validateStep = async () => {
      let isValid = false
      let step: string | null = '1'

      switch (selectedStep) {
        case '1':
          isValid = await trigger('name')
          step = '2'
          break
        case '2':
          isValid = await trigger('officeIds')
          step = '3'
          break
        case '3':
        default:
          isValid = await trigger('status')
          step = '3'
          break
      }
      if (isValid && step) {
        setSelectedStep(step)
      }
    }
    validateStep()
  }

export const handleSetOptions =
  (
    getValues: UseFormGetValues<CreateOfficeGroupSchema>,
    options: MultiSelectOption[],
    offices: OfficeModel[],
    setOptions: Dispatch<SetStateAction<MultiSelectOption[]>>,
  ) =>
  () => {
    const officeIds = getValues().officeIds
    const newSelectedOptions = options.filter((option) => officeIds.includes(option.value))
    const officeOptions = prepareOfficeOptions(offices)
    const newOptions = [...newSelectedOptions, ...officeOptions]
    const uniqueOptions = [...new Set([...newOptions.map((option) => JSON.stringify(option))])].map((jsonOption) =>
      JSON.parse(jsonOption),
    )

    setOptions(uniqueOptions)
  }

export const OfficeGroupCreate: FC<OfficeGroupCreateProps> = () => {
  const [searchString, setSearchString] = useState<string>('')
  const [options, setOptions] = useState<MultiSelectOption[]>([])
  const [selectedStep, setSelectedStep] = useState<string>('1')
  const { mutate } = useSWRConfig()
  const {
    orgIdState: { orgId, orgClientId, orgName },
  } = useOrgId()
  const { success, error } = useSnack()
  const debouncedSearch = useCallback(
    debounce((event: ChangeEvent<HTMLInputElement>) => setSearchString(event.target.value), 500),
    [500],
  )
  const { data } = useSWR<OfficeModelPagedResult | undefined>(
    !orgClientId || !searchString ? null : `${URLS.OFFICES}?pageSize=500&name=${searchString}`,
    fetcherWithClientCode(orgClientId as string),
  )

  const offices = data?._embedded ?? []

  const onSubmit = onHandleSubmit(history, orgId, mutate, success, error)

  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<CreateOfficeGroupSchema>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: '',
      officeIds: '',
      status: true,
    },
  })

  useEffect(handleSetOptions(getValues, options, offices, setOptions), [data])

  if (!orgId)
    return (
      <PersistentNotification isFullWidth isExpanded intent="secondary" isInline>
        No organisation selected. You need to select an organisation to create an Office Group for.
      </PersistentNotification>
    )

  return (
    <form onSubmit={handleSubmit(onSubmit)} onChange={handleSwitchStep(selectedStep, trigger, setSelectedStep)}>
      <Title>{orgName} Create Office Group</Title>
      <StepsVertical
        steps={[
          {
            item: '1',
            content: (
              <FormLayout className={elFadeIn}>
                <InputWrapFull>
                  <BodyText hasGreyText>Add a name for your office group.</BodyText>
                </InputWrapFull>
                <InputWrap>
                  <InputGroup
                    label="Office Group Name"
                    placeholder="Enter an office group name"
                    {...register('name')}
                    inputAddOnText={errors?.name?.message}
                    intent="danger"
                  />
                </InputWrap>
              </FormLayout>
            ),
          },
          {
            item: '2',
            content: (
              <FormLayout className={elFadeIn}>
                <InputWrapFull>
                  <BodyText hasGreyText>
                    To manage offices associated to this group, you can search and select users from the ‘Offices’
                    section below:
                  </BodyText>
                </InputWrapFull>
                <InputWrapFull>
                  <InputGroup onChange={debouncedSearch} icon="searchSystem" placeholder="Search" label="Offices" />
                  <MultiSelectInput
                    id="office-ids-select"
                    noneSelectedLabel="No offices selected for this group"
                    defaultValues={[]}
                    options={options}
                    {...register('officeIds')}
                  />
                </InputWrapFull>
              </FormLayout>
            ),
          },
          {
            item: '3',
            content: (
              <FormLayout className={elFadeIn}>
                <InputWrapFull>
                  <BodyText hasGreyText>Toggle the below to determine if the office grouping is live or not.</BodyText>
                </InputWrapFull>
                <InputWrap>
                  <Label>Group Active</Label>
                  <Toggle id="status-edit-toggle" hasGreyBg {...register('status')}>
                    <ElToggleItem>Active</ElToggleItem>
                    <ElToggleItem>Inactive</ElToggleItem>
                  </Toggle>
                </InputWrap>
                <InputWrapFull>
                  <ButtonGroup alignment="right">
                    <Button intent="primary" type="submit">
                      Submit
                    </Button>
                  </ButtonGroup>
                </InputWrapFull>
              </FormLayout>
            ),
          },
        ]}
        selectedStep={selectedStep}
        onStepClick={setSelectedStep}
      />
    </form>
  )
}

export default OfficeGroupCreate
