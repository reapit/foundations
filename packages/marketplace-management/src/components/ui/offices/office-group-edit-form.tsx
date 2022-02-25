import React, { ChangeEvent, Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from 'react'
import { OfficeGroupModel } from '../../../types/organisations-schema'
import { OFFICE_IN_USE_ERROR, updateOfficeGroup } from '../../../services/office'
import { toastMessages } from '../../../constants/toast-messages'
import { prepareOfficeOptions } from '../../../utils/prepare-options'
import { OfficeModel, OfficeModelPagedResult } from '@reapit/foundations-ts-definitions'
import debounce from 'just-debounce-it'
import useSWR from 'swr'
import { URLS } from '../../../constants/api'
import {
  BodyText,
  Button,
  ButtonGroup,
  elFadeIn,
  elP8,
  ElToggleItem,
  FormLayout,
  InputGroup,
  InputWrap,
  InputWrapFull,
  Label,
  MultiSelectInput,
  MultiSelectOption,
  PersistantNotification,
  Subtitle,
  Toggle,
  useSnack,
} from '@reapit/elements'
import { yupResolver } from '@hookform/resolvers/yup'
import { boolean, object, string } from 'yup'
import errorMessages from '../../../constants/error-messages'
import { useForm, UseFormReset, UseFormGetValues } from 'react-hook-form'
import { fetcherWithClientCode } from '../../../utils/fetcher'
import { useOrgId } from '../../../utils/use-org-id'

export interface OfficeGroupEditFormProps {
  officeGroup: OfficeGroupModel
  offices: OfficeModel[]
  orgId: string
  onComplete: () => void
}

export const validationSchema = object().shape({
  name: string().trim().required(errorMessages.FIELD_REQUIRED),
  officeIds: string().trim().required(errorMessages.FIELD_REQUIRED),
  status: boolean(),
})

export interface EditOfficeGroupSchema {
  name: string
  officeIds: string
  status: boolean
}

export const onHandleSubmit =
  (
    onComplete: () => void,
    officeGroup: OfficeGroupModel,
    orgId: string,
    success: (message: string) => void,
    error: (message: string, delay?: number) => void,
  ) =>
  async (params: EditOfficeGroupSchema) => {
    const { name, officeIds: listId } = params
    const officeIds = listId.toString()
    const status = params.status ? 'active' : 'inactive'
    const response = await updateOfficeGroup({ name, officeIds, status }, orgId, officeGroup?.id || '')

    if (response && response === OFFICE_IN_USE_ERROR) {
      return error(toastMessages.OFFICE_ALREADY_ASSIGNED_EDIT, 10000)
    }

    if (response) {
      success(toastMessages.CHANGES_SAVE_SUCCESS)
      onComplete()
      return
    }

    error(toastMessages.FAILED_TO_EDIT_OFFICE_GROUP)
  }

export const handleSetOptions =
  (
    officeGroup: OfficeGroupModel,
    offices: OfficeModel[],
    setOptions: Dispatch<SetStateAction<MultiSelectOption[]>>,
    reset: UseFormReset<EditOfficeGroupSchema>,
  ) =>
  () => {
    if (officeGroup && offices) {
      const newSelectedOptions = offices.filter((office) => office.id && officeGroup.officeIds?.includes(office.id))
      const officeOptions = prepareOfficeOptions(newSelectedOptions)

      reset({
        name: officeGroup.name ?? '',
        officeIds: officeGroup.officeIds,
        status: officeGroup.status === 'active',
      })
      setOptions(officeOptions)
    }
  }

export const handleSetNewOptions =
  (
    getValues: UseFormGetValues<EditOfficeGroupSchema>,
    options: MultiSelectOption[],
    searchedOffices: OfficeModel[],
    setOptions: Dispatch<SetStateAction<MultiSelectOption[]>>,
  ) =>
  () => {
    const officeIds = getValues().officeIds

    if (officeIds) {
      const newSelectedOptions = options.filter((option) => officeIds.includes(option.value))
      const officeOptions = prepareOfficeOptions(searchedOffices)
      const newOptions = [...newSelectedOptions, ...officeOptions]
      const uniqueOptions = [...new Set([...newOptions.map((option) => JSON.stringify(option))])].map((jsonOption) =>
        JSON.parse(jsonOption),
      )

      setOptions(uniqueOptions)
    }
  }

export const OfficeGroupEditForm: FC<OfficeGroupEditFormProps> = ({ officeGroup, offices, orgId, onComplete }) => {
  const [searchString, setSearchString] = useState<string>('')
  const [options, setOptions] = useState<MultiSelectOption[]>([])
  const { success, error } = useSnack()
  const debouncedSearch = useCallback(
    debounce((event: ChangeEvent<HTMLInputElement>) => setSearchString(event.target.value), 500),
    [500],
  )
  const {
    orgIdState: { orgClientId },
  } = useOrgId()

  const { data } = useSWR<OfficeModelPagedResult | undefined>(
    !orgClientId || !searchString ? null : `${URLS.OFFICES}?pageSize=100&&name=${searchString}`,
    fetcherWithClientCode(orgClientId as string),
  )

  const searchedOffices = data?._embedded ?? []

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<EditOfficeGroupSchema>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: officeGroup.name ?? '',
      officeIds: officeGroup.officeIds,
      status: officeGroup.status === 'active',
    },
  })

  useEffect(handleSetOptions(officeGroup, offices, setOptions, reset), [officeGroup, offices])

  useEffect(handleSetNewOptions(getValues, options, searchedOffices, setOptions), [searchString, data])

  return (
    <form className={elP8} onSubmit={handleSubmit(onHandleSubmit(onComplete, officeGroup, orgId, success, error))}>
      <Subtitle>Edit Office Group</Subtitle>
      <BodyText hasGreyText hasSectionMargin>
        To manage offices associated to this group, you can search and select users from the ‘Offices’ section below:
      </BodyText>
      <FormLayout hasMargin className={elFadeIn}>
        <InputWrap>
          <InputGroup
            label="Office Group Name"
            placeholder="Enter an office group name"
            {...register('name')}
            inputAddOnText={errors?.name?.message}
            intent="danger"
          />
        </InputWrap>
        <InputWrap>
          <Label>Group Active</Label>
          <Toggle id={`status-edit-toggle-${officeGroup.id}`} hasGreyBg {...register('status')}>
            <ElToggleItem>Active</ElToggleItem>
            <ElToggleItem>Inactive</ElToggleItem>
          </Toggle>
        </InputWrap>
        <InputWrapFull>
          <InputGroup onChange={debouncedSearch} icon="searchSystem" placeholder="Search" label="Offices" />
          <MultiSelectInput
            id={`office-group-edit-edit-ids-${officeGroup.id}`}
            noneSelectedLabel="No offices selected for this group"
            defaultValues={officeGroup.officeIds ? [...new Set(officeGroup.officeIds.split(','))] : []}
            options={options}
            {...register('officeIds')}
          />
          {errors.officeIds && (
            <PersistantNotification isFullWidth isExpanded intent="danger" isInline>
              {errors.officeIds.message}
            </PersistantNotification>
          )}
        </InputWrapFull>
      </FormLayout>
      <ButtonGroup alignment="right">
        <Button intent="primary" type="submit">
          Submit
        </Button>
      </ButtonGroup>
    </form>
  )
}

export default OfficeGroupEditForm
