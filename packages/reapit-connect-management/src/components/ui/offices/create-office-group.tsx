import React, { useState, useEffect } from 'react'
import { useFormikContext } from 'formik'
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
import { createOfficeGroup } from '../../../services/office'
import { toastMessages } from '../../../constants/toast-messages'
import { prepareOfficeOptions } from '../../../utils/prepare-options'
import { validationSchema } from './validation-schema'
import { formFields } from './form-fields'
import { OfficeModelPagedResult } from '@reapit/foundations-ts-definitions'

export interface CreateOfficeGroupModalProps {
  visible: boolean
  setOpenCreateGroupModal: React.Dispatch<React.SetStateAction<boolean>>
  orgId: string
  onRefetchData: () => void
  offices: OfficeModelPagedResult
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
  if (createdOffice) {
    notification.success({
      message: toastMessages.CREATE_OFFICE_GROUP_SUCCESS,
      placement: 'bottomRight',
    })
    handleOnClose()
    onRefetchData()
    return
  }

  notification.error({
    message: toastMessages.FAILED_TO_CREATE_OFFICE_GROUP,
    placement: 'bottomRight',
  })
}

export const FormChangeEffect: React.FC<FormChangeEffectProps> = ({ setSelectedOffice, options }) => {
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
  offices,
}) => {
  const [selectedOffice, setSelectedOffice] = useState<SelectOptions>([])
  const [options, setOptions] = useState<SelectOptions>([])
  const handleOnClose = () => setOpenCreateGroupModal(false)
  const { name, officeIds } = formFields

  const onSubmit = onHandleSubmit(handleOnClose, onRefetchData, orgId)

  useEffect(() => {
    if (offices) {
      const { _embedded: listOffice } = offices
      const officeOptions = prepareOfficeOptions(listOffice || [])
      setOptions([...selectedOffice, ...officeOptions])
    }
  }, [offices])

  return (
    <ModalV2 visible={visible} destroyOnClose={true} onClose={handleOnClose} title="Create Office Group" zIndex={90}>
      <p className="helper-text">
        <i>
          To create a new office group, please provide a group ‘Name’ and search and select an Office(s). You will need
          a minimum of 1 office to create a new group.
        </i>
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
                  required
                  filterOption={true}
                  optionFilterProp="children"
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
