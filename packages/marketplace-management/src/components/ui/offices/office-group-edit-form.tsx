import React, { ChangeEvent, Dispatch, FC, SetStateAction, useCallback, useEffect, useState, MouseEvent } from 'react'
import { OfficeGroupModel } from '../../../types/organisations-schema'
import { OFFICE_IN_USE_ERROR, updateOfficeGroup } from '../../../services/office'
import { toastMessages } from '../../../constants/toast-messages'
import { prepareOfficeOptions } from '../../../utils/prepare-options'
import { InstallationModelPagedResult, OfficeModel, OfficeModelPagedResult } from '@reapit/foundations-ts-definitions'
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
  PersistentNotification,
  Subtitle,
  Toggle,
  useModal,
  useSnack,
} from '@reapit/elements'
import { yupResolver } from '@hookform/resolvers/yup'
import { boolean, object, string } from 'yup'
import errorMessages from '../../../constants/error-messages'
import { useForm, UseFormReset, UseFormGetValues } from 'react-hook-form'
import { fetcherWithClientCode } from '../../../utils/fetcher'
import { useOrgId } from '../../../utils/use-org-id'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { GetActionNames, getActions, UpdateActionNames, updateActions } from '@reapit/utils-common'
import { SendFunction, useReapitGet, useReapitUpdate } from '@reapit/utils-react'
import { Link } from 'react-router-dom'
import Routes from '../../../constants/routes'

export interface OfficeGroupEditFormProps {
  officeGroup: OfficeGroupModel
  offices: OfficeModel[]
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
    orgId: string | null,
    success: (message: string) => void,
    error: (message: string, delay?: number) => void,
  ) =>
  async (params: EditOfficeGroupSchema) => {
    if (!orgId) return
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

export const handleDeleteGroup =
  (deleteOfficeGroup: SendFunction<undefined, boolean>, onComplete: () => void, closeModal: () => void) =>
  async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()

    const response = await deleteOfficeGroup(undefined)

    if (response) {
      onComplete()
      closeModal()
    }
  }

export const handleOpenModal = (openModal: () => void) => (event: MouseEvent<HTMLButtonElement>) => {
  event.preventDefault()
  event.stopPropagation()
  openModal()
}

export const OfficeGroupEditForm: FC<OfficeGroupEditFormProps> = ({ officeGroup, offices, onComplete }) => {
  const [searchString, setSearchString] = useState<string>('')
  const [options, setOptions] = useState<MultiSelectOption[]>([])
  const { success, error } = useSnack()
  const debouncedSearch = useCallback(
    debounce((event: ChangeEvent<HTMLInputElement>) => setSearchString(event.target.value), 500),
    [500],
  )
  const {
    orgIdState: { orgClientId, orgId },
  } = useOrgId()

  const { Modal, openModal, closeModal, modalIsOpen } = useModal()

  const { data } = useSWR<OfficeModelPagedResult | undefined>(
    !orgClientId || !searchString ? null : `${URLS.OFFICES}?pageSize=500&&name=${searchString}`,
    fetcherWithClientCode(orgClientId as string),
  )

  const [, , deleteOfficeGroup] = useReapitUpdate<undefined, boolean>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.deleteOfficeGroup],
    method: 'DELETE',
    uriParams: {
      orgId,
      groupId: officeGroup.id,
    },
  })

  const [installations] = useReapitGet<InstallationModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getInstallations],
    queryParams: {
      pageSize: 999,
      isInstalled: true,
      clientId: officeGroup.customerId,
    },
    fetchWhenTrue: [modalIsOpen, officeGroup.customerId],
  })

  const searchedOffices = data?._embedded ?? []
  const hasInstallations = Boolean(
    installations?.data?.filter((install) => install.client === officeGroup.customerId).length,
  )

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
            <PersistentNotification isFullWidth isExpanded intent="danger" isInline>
              {errors.officeIds.message}
            </PersistentNotification>
          )}
        </InputWrapFull>
      </FormLayout>
      <Modal title={hasInstallations ? 'Unable to Delete' : 'Confirm Office Group Deletion'}>
        <BodyText>
          {hasInstallations
            ? 'Unfortunately, as there are active app installations associated to this group, the group cannot be deleted. Please uninstall any installations associated to this group.'
            : 'Are you sure you want to delete this office group?'}
        </BodyText>
        {hasInstallations && (
          <BodyText>
            To uninstall, please visit <Link to={Routes.MARKETPLACE}>the AppMarket page.</Link>
          </BodyText>
        )}
        <ButtonGroup alignment="right">
          <Button onClick={closeModal} intent="low" type="button">
            Close
          </Button>
          {!hasInstallations && (
            <Button
              onClick={handleDeleteGroup(deleteOfficeGroup, onComplete, closeModal)}
              intent="danger"
              type="button"
            >
              Delete
            </Button>
          )}
        </ButtonGroup>
      </Modal>
      <ButtonGroup alignment="right">
        <Button onClick={handleOpenModal(openModal)} intent="danger" type="button">
          Delete
        </Button>
        <Button intent="primary" type="submit">
          Submit
        </Button>
      </ButtonGroup>
    </form>
  )
}

export default OfficeGroupEditForm
