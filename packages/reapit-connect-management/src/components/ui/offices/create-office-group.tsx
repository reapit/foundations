import React, { useState, useCallback, useEffect } from 'react'
import useSWR from 'swr'
import { useFormikContext } from 'formik'
import debounce from 'just-debounce-it'
import {
  Button,
  Section,
  ModalV2,
  Formik,
  Form,
  Input,
  DropdownSelect,
  notification,
  SelectOption,
} from '@reapit/elements'
import { URLS } from '../../../constants/api'
import { createOfficeGroup } from '../../../services/office'
import { toastMessages } from '../../../constants/toast-messages'
import { prepareOfficeOptions } from '../../../utils/prepare-options'
import { validationSchema } from './validation-schema'
import { formFields } from './form-fields'

export interface CreateOfficeGroupModalProps {
  visible: boolean
  setOpenCreateGroupModal: React.Dispatch<React.SetStateAction<boolean>>
  orgId: string
  onRefetchData: () => void
}

export interface CreateOfficeGroupModel {
  name: string
  officeIds: string[]
}

type SelectOptions = SelectOption[]

interface FormChangeEffectProps {
  setSelectedOffice: (options: SelectOptions) => void
  options: SelectOptions
}

export const onHandleSubmit = (handleOnClose: () => void, onRefetchData: () => void, orgId: string) => async (
  params: CreateOfficeGroupModel,
) => {
  const { name, officeIds: listId } = params
  const officeIds = listId.toString()
  const createdOffice = await createOfficeGroup({ name, officeIds }, orgId)
  if (!createdOffice) {
    notification.success({
      message: toastMessages.CREATE_OFFICE_GROUP_SUCCESS,
      placement: 'bottomRight',
    })
    handleOnClose()
    onRefetchData()
    return
  }

  notification.error({
    message: createdOffice.description || toastMessages.FAILED_TO_CREATE_OFFICE_GROUP,
    placement: 'bottomRight',
  })
}

const FormChangeEffect: React.FC<FormChangeEffectProps> = ({ setSelectedOffice, options }) => {
  const formik: { values: { officeIds: string[] } } = useFormikContext()
  const { officeIds } = formik.values

  useEffect(() => {
    setSelectedOffice(options.filter((item: any) => formik.values.officeIds.indexOf(item.value) !== -1))
  }, [officeIds])

  return null
}

export const CreateOfficeGroupModal: React.FC<CreateOfficeGroupModalProps> = ({
  visible,
  setOpenCreateGroupModal,
  orgId,
  onRefetchData,
}) => {
  const [selectedOffice, setSelectedOffice] = useState<SelectOptions>([])
  const [options, setOptions] = useState<SelectOptions>([])
  const [searchString, setSearchString] = useState<string>('')
  const handleOnClose = () => setOpenCreateGroupModal(false)
  const { name, officeIds } = formFields

  const onSubmit = onHandleSubmit(handleOnClose, onRefetchData, orgId)
  const debounceMs = 500

  const debouncedSearch = useCallback(
    debounce((value: string) => setSearchString(value), debounceMs),
    [debounceMs],
  )

  const { data }: any = useSWR(`${URLS.OFFICES}/${searchString ? `?name=${searchString}` : ''}`)
  useEffect(() => {
    if (data) {
      const { _embedded: listOffice } = data
      const officeOptions = prepareOfficeOptions(listOffice)
      setOptions([...selectedOffice, ...officeOptions])
    }
  }, [data])

  return (
    <ModalV2 visible={visible} destroyOnClose={true} onClose={handleOnClose} title="Create Office Group" zIndex={90}>
      <p className="helper-text">
        Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.
      </p>
      <Formik initialValues={{ name: '', officeIds: [] }} onSubmit={onSubmit} validationSchema={validationSchema}>
        {() => {
          return (
            <Form noValidate={true}>
              <Section hasPadding={false} hasMargin={false}>
                <Input type="text" labelText={name.label} id={name.name} name={name.name} required />
                <DropdownSelect
                  mode="multiple"
                  id={officeIds.name}
                  placeholder="Please select"
                  name={officeIds.name}
                  labelText={officeIds.label}
                  options={options}
                  onSearch={(value: string) => debouncedSearch(value)}
                  required
                />
                <FormChangeEffect setSelectedOffice={setSelectedOffice} options={options} />
              </Section>
              <Section isFlex hasPadding={false} hasMargin={false}>
                <Button variant="info" disabled={false} onClick={handleOnClose} type="button">
                  Cancel
                </Button>
                <Button variant="info" loading={false} type="submit">
                  Create
                </Button>
              </Section>
            </Form>
          )
        }}
      </Formik>
    </ModalV2>
  )
}

export default CreateOfficeGroupModal
