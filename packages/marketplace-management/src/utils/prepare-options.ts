import { MultiSelectOption } from '@reapit/elements'
import { SelectOption } from '@reapit/elements-legacy'
import { OfficeModel } from '@reapit/foundations-ts-definitions'
import { GroupModel } from '../types/organisations-schema'

export const prepareOfficeOptions: (data: OfficeModel[]) => MultiSelectOption[] = (data) =>
  data.map((office: OfficeModel) => {
    const { id, name } = office

    return {
      name,
      value: id,
    } as MultiSelectOption
  })

export const prepareUserGroupOptions: (data: GroupModel[]) => SelectOption[] = (data) =>
  data.map((userGroup: GroupModel) => {
    const { id, description } = userGroup

    return {
      label: id,
      value: id,
      description,
    } as SelectOption
  })
