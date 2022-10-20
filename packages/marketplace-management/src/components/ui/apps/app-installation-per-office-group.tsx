import React, { Dispatch, SetStateAction, useState, useEffect, ChangeEvent, FC, useMemo } from 'react'
import useSWR from 'swr'
import { InstallationModel } from '@reapit/foundations-ts-definitions'
import { OfficeGroupModel, OfficeGroupModelPagedResult } from '@reapit/foundations-ts-definitions'
import { URLS } from '../../../constants/api'
import { Button, ButtonGroup, InputWrapFull, Loader, MultiSelectInput, MultiSelectOption } from '@reapit/elements'
import { useOrgId } from '../../../utils/use-org-id'

export interface AppInstallationPerOfficeGroupProps {
  installations: InstallationModel[]
  setOfficeGroupsToAdd: Dispatch<SetStateAction<string[]>>
  setOfficeGroupsToRemove: Dispatch<SetStateAction<string[]>>
}

export type OfficeGroupToggleType = 'all' | 'none' | null

export const handleOnChange =
  (
    officeGroups: OfficeGroupModel[],
    installations: InstallationModel[],
    setOfficeGroupsToAdd: Dispatch<SetStateAction<string[]>>,
    setOfficeGroupsToRemove: Dispatch<SetStateAction<string[]>>,
  ) =>
  (event: ChangeEvent<HTMLInputElement>) => {
    const newValues = event.target.value.split(',').filter(Boolean)
    const originalValues =
      officeGroups
        .filter((group) => installations.find((installation) => installation.client === group.customerId))
        .map((filteredGroup) => filteredGroup.customerId ?? '') ?? []

    const valuesToAdd = newValues.filter((value) => !originalValues.includes(value))
    const valuesToRemove = originalValues.filter((value) => !newValues.includes(value))

    setOfficeGroupsToAdd(valuesToAdd)
    setOfficeGroupsToRemove(valuesToRemove)
  }

export const handleSetOfficeGroupToggleType =
  (
    officeGroupToggleType: OfficeGroupToggleType,
    setOfficeGroupToggleType: Dispatch<SetStateAction<OfficeGroupToggleType>>,
  ) =>
  () => {
    setOfficeGroupToggleType(officeGroupToggleType)
  }

export const handleSortOptions = (officeGroups: OfficeGroupModel[]) => (): MultiSelectOption[] => {
  return officeGroups
    .map(({ customerId, name, status }) => {
      if (status === 'active') {
        return {
          value: customerId ?? '',
          name: name ?? '',
        }
      }
    })
    .filter(Boolean) as MultiSelectOption[]
}

export const handleDefaultValues =
  (
    officeGroupToggleType: OfficeGroupToggleType,
    officeGroups: OfficeGroupModel[],
    installations: InstallationModel[],
    setDefaultValues: Dispatch<SetStateAction<string[]>>,
  ) =>
  () => {
    if (officeGroups && installations) {
      const originalValues =
        officeGroups
          .filter((group) => installations.find((installation) => installation.client === group.customerId))
          .map((filteredGroup) => filteredGroup.customerId ?? '') ?? []
      const allValues = officeGroups.map((group) => group.customerId ?? '') ?? []
      const noValues = []
      const newDefaultValues =
        officeGroupToggleType === 'none' ? noValues : officeGroupToggleType === 'all' ? allValues : originalValues
      setDefaultValues(newDefaultValues)
    }
  }

const AppInstallationPerOfficeGroup: FC<AppInstallationPerOfficeGroupProps> = ({
  installations,
  setOfficeGroupsToAdd,
  setOfficeGroupsToRemove,
}: AppInstallationPerOfficeGroupProps) => {
  const [defaultValues, setDefaultValues] = useState<string[]>([])
  const [officeGroupToggleType, setOfficeGroupToggleType] = useState<OfficeGroupToggleType>(null)

  const {
    orgIdState: { orgId },
  } = useOrgId()

  const { data } = useSWR<OfficeGroupModelPagedResult>(
    !orgId ? null : `${URLS.ORGANISATIONS}/${orgId}${URLS.OFFICES_GROUPS}?pageSize=999`,
  )

  const officeGroups = data?._embedded ?? []
  const options = useMemo(handleSortOptions(officeGroups), [officeGroups])

  useEffect(handleDefaultValues(officeGroupToggleType, officeGroups, installations, setDefaultValues), [
    officeGroupToggleType,
    officeGroups,
    installations,
  ])

  if (!data) return <Loader />

  return (
    <>
      <InputWrapFull>
        <ButtonGroup alignment="right">
          <Button
            intent="secondary"
            disabled={officeGroupToggleType === 'all'}
            onClick={handleSetOfficeGroupToggleType('all', setOfficeGroupToggleType)}
          >
            Select all
          </Button>
          <Button
            intent="secondary"
            disabled={officeGroupToggleType === 'none'}
            onClick={handleSetOfficeGroupToggleType('none', setOfficeGroupToggleType)}
          >
            Deselect all
          </Button>
        </ButtonGroup>
      </InputWrapFull>
      <InputWrapFull>
        <MultiSelectInput
          id="select-groups-to-install"
          onChange={handleOnChange(officeGroups, installations, setOfficeGroupsToAdd, setOfficeGroupsToRemove)}
          noneSelectedLabel="No groups selected to install"
          defaultValues={[...new Set(defaultValues)]}
          options={options}
        />
      </InputWrapFull>
    </>
  )
}
export default AppInstallationPerOfficeGroup
