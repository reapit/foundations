import React from 'react'
import useSWR from 'swr'
import { FormFieldInfo } from '@reapit/utils'
import {
  Button,
  Section,
  ModalV2,
  H5,
  Formik,
  Form,
  Input,
  DropdownSelect,
  Loader,
  notification,
} from '@reapit/elements'
import { URLS } from '../../../constants/api'
import { createOfficeGroup } from '../../../services/office'
import { errorMessages } from '../../../constants/errorMessages'
import { prepareOfficeOptions } from '../../../utils/prepareOptions'

export interface CreateOfficeGroupModalProps {
  visible: boolean
  setOpenCreateGroupModal: React.Dispatch<React.SetStateAction<boolean>>
  orgId: string
  onRefetchData: Function
}

export interface CreateOfficeGroupModel {
  name: string
  officeIds: string[]
}

export type FieldType = 'name' | 'officeIds'

export const formFields: Record<FieldType, FormFieldInfo> = {
  name: {
    name: 'name',
    label: 'Name',
  },
  officeIds: {
    name: 'officeIds',
    label: 'Offices',
  },
}

export const CreateOfficeGroupModal: React.FC<CreateOfficeGroupModalProps> = ({
  visible,
  setOpenCreateGroupModal,
  orgId,
  onRefetchData,
}) => {
  const handleOnClose = () => setOpenCreateGroupModal(false)
  const { name, officeIds } = formFields

  const { data }: any = useSWR(`${URLS.OFFICES}`)
  if (!data) return <Loader />
  const { _embedded: listOffice } = data
  const officeOptions = prepareOfficeOptions(listOffice)

  const onSubmit = async (params: CreateOfficeGroupModel) => {
    const { name, officeIds: listId } = params
    const officeIds = listId.toString()
    const createdOffice = await createOfficeGroup({ name, officeIds }, orgId)
    if (!createdOffice) {
      notification.success({
        message: errorMessages.CREATE_OFFICE_GROUP_SUCCESS,
        placement: 'bottomRight',
      })
      handleOnClose()
      return onRefetchData()
    }

    return notification.error({
      message: createdOffice.description || errorMessages.FAILED_TO_CREATE_OFFICE_GROUP,
      placement: 'bottomRight',
    })
  }

  return (
    <ModalV2 visible={visible} destroyOnClose={true} onClose={handleOnClose} title="Manage Offices" zIndex={90}>
      <H5>Create Office Group</H5>
      <p>
        Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.
      </p>
      <Formik initialValues={{ name: '', officeIds: [] }} onSubmit={onSubmit}>
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
                  options={officeOptions}
                />
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
