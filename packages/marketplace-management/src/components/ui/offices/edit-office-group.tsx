import React, { useCallback, useEffect, useState } from 'react'
import { FormFieldInfo } from '@reapit/utils'
import { OfficeGroupModel } from '../../../types/organisations-schema'
import {
  Button,
  Section,
  ModalV2,
  Formik,
  Form,
  Input,
  DropdownSelect,
  notification,
  Checkbox,
  SelectOption,
  ButtonGroup,
} from '@reapit/elements'
import { updateOfficeGroup } from '../../../services/office'
import { toastMessages } from '../../../constants/toast-messages'
import { prepareOfficeOptions } from '../../../utils/prepare-options'
import { OfficeModel, OfficeModelPagedResult } from '@reapit/foundations-ts-definitions'
import debounce from 'just-debounce-it'
import useSWR from 'swr'
import { URLS } from '../../../constants/api'
import qs from 'query-string'

export interface UpdateOfficeGroupModalProps {
  editingGroup: OfficeGroupModel | undefined
  setEditingGroup: React.Dispatch<React.SetStateAction<OfficeGroupModel | undefined>>
  orgId: string
  onRefetchData: () => void
}

interface UpdateOfficeGroupModel {
  name: string
  officeIds: string[]
  status: boolean
}

type FieldType = 'name' | 'officeIds' | 'status'
type SelectOptions = SelectOption[]

export const formFields: Record<FieldType, FormFieldInfo> = {
  name: {
    name: 'name',
    label: 'Name',
  },
  officeIds: {
    name: 'officeIds',
    label: 'Offices (Type to search)',
  },
  status: {
    name: 'status',
    label: 'Active',
  },
}
export const onHandleSubmit = (
  handleOnClose: () => void,
  onRefetchData: () => void,
  editingGroup: OfficeGroupModel,
  orgId: string,
) => async (params: UpdateOfficeGroupModel) => {
  const { name, officeIds: listId } = params
  const officeIds = listId.toString()
  const status = params.status ? 'active' : 'inactive'
  const updateOffice = await updateOfficeGroup({ name, officeIds, status }, orgId, editingGroup?.id || '')

  if (updateOffice) {
    notification.success({
      message: toastMessages.CHANGES_SAVE_SUCCESS,
    })
    handleOnClose()
    onRefetchData()
    return
  }

  notification.error({
    message: toastMessages.FAILED_TO_EDIT_OFFICE_GROUP,
  })
}

export const UpdateOfficeGroupModal: React.FC<UpdateOfficeGroupModalProps> = ({
  editingGroup,
  setEditingGroup,
  orgId,
  onRefetchData,
}) => {
  const [searchString, setSearchString] = useState<string>('')
  const [initialOfficesSearch, setInitialOfficesSearch] = useState<string>('')
  const [options, setOptions] = useState<SelectOptions>([])
  const debouncedSearch = useCallback(
    debounce((value: string) => setSearchString(value), 500),
    [500],
  )
  const { data: offices } = useSWR<OfficeModelPagedResult | undefined>(
    !orgId || !searchString
      ? null
      : `${URLS.OFFICES}?pageSize=999&organisationId=${orgId}&name=${searchString}&name=${searchString}`,
  )

  const { data: selectedOffices } = useSWR<OfficeModelPagedResult | undefined>(
    !orgId || !initialOfficesSearch
      ? null
      : `${URLS.OFFICES}?pageSize=999&organisationId=${orgId}&${initialOfficesSearch}`,
  )

  const { name, officeIds, status } = formFields

  useEffect(() => {
    if (editingGroup) {
      const intitialOfficeIds = editingGroup?.officeIds
        ? qs.stringify({ id: editingGroup?.officeIds?.split(',') }, { indices: false })
        : ''
      setInitialOfficesSearch(intitialOfficeIds)
    }
  }, [editingGroup])

  useEffect(() => {
    if (selectedOffices || offices) {
      const combinedOffices: OfficeModel[] = [...(selectedOffices?._embedded ?? []), ...(offices?._embedded ?? [])]
      const officeOptions = prepareOfficeOptions(combinedOffices || [])
      setOptions([...officeOptions])
    }
  }, [offices, selectedOffices])

  if (!editingGroup) return null

  const handleOnClose = () => setEditingGroup(undefined)
  const onSubmit = onHandleSubmit(handleOnClose, onRefetchData, editingGroup, orgId)

  return (
    <ModalV2
      visible={!!editingGroup}
      destroyOnClose={true}
      onClose={handleOnClose}
      title={`Editing ${editingGroup.name}`}
      zIndex={90}
    >
      <p className="mb-4">
        <p>
          To manage members associated to this group, you can search and select users from the ‘Groups Members’ section
          below:
        </p>
      </p>
      <Formik
        initialValues={{
          name: editingGroup.name || '',
          officeIds: editingGroup.officeIds?.split(',') || [],
          status: editingGroup.status === 'active',
        }}
        onSubmit={onSubmit}
      >
        {() => {
          return (
            <Form noValidate={true}>
              <Section hasPadding={false} hasMargin={false}>
                <Input type="text" labelText={name.label} id={name.name} name={name.name} />
                <DropdownSelect
                  mode="multiple"
                  id={officeIds.name}
                  placeholder="Please select"
                  name={officeIds.name}
                  labelText={officeIds.label}
                  options={options}
                  onSearch={(value: string) => debouncedSearch(value)}
                  filterOption={true}
                  optionFilterProp="children"
                />
                <Checkbox id={status.name} labelText={status.label as string} name={status.name} />
              </Section>
              <ButtonGroup hasSpacing isCentered>
                <Button variant="secondary" disabled={false} onClick={handleOnClose} type="button">
                  Cancel
                </Button>
                <Button variant="primary" loading={false} type="submit">
                  Save
                </Button>
              </ButtonGroup>
            </Form>
          )
        }}
      </Formik>
    </ModalV2>
  )
}

export default UpdateOfficeGroupModal
