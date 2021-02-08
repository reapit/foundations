import React, { Dispatch, SetStateAction, useState, useEffect } from 'react'
import useSWR from 'swr'
import { InstallationModelPagedResult } from '@reapit/foundations-ts-definitions'
import { OfficeGroupModelPagedResult, OfficeGroupModel } from '../../../types/organisations-schema'
import { FadeIn, Loader, Section, Table } from '@reapit/elements'
import OfficeListCell from '../offices/office-list-cell'
import { URLS } from '../../../constants/api'
import { orgIdEffectHandler } from '../../../utils/org-id-effect-handler'

export interface AppInstallationPerOfficeGroupProps {
  installations: InstallationModelPagedResult | undefined
  officeGroupsToAdd: string[]
  setOfficeGroupsToAdd: Dispatch<SetStateAction<string[]>>
  officeGroupsToRemove: string[]
  setOfficeGroupsToRemove: Dispatch<SetStateAction<string[]>>
}

const AppInstallationPerOfficeGroup: React.FC<AppInstallationPerOfficeGroupProps> = ({
  installations,
  officeGroupsToAdd,
  setOfficeGroupsToAdd,
  officeGroupsToRemove,
  setOfficeGroupsToRemove,
}: AppInstallationPerOfficeGroupProps) => {
  const [officeGroupsTableData, setOfficeGroupsTableData] = useState<OfficeGroupModel[] | undefined>([])
  const [orgId, setOrgId] = useState<string | null>(null)

  useEffect(orgIdEffectHandler(orgId, setOrgId), [])

  const { data: officeGroups, isValidating: officeGroupsValidating } = useSWR<OfficeGroupModelPagedResult>(
    !orgId ? null : `${URLS.ORGANISATIONS}/${orgId}${URLS.OFFICES_GROUPS}?pageSize=100`,
  )

  useEffect(() => {
    if (officeGroups && officeGroups._embedded) {
      setOfficeGroupsTableData(
        officeGroups._embedded.map(og => ({
          name: og.name,
          officeIds: og.officeIds,
          customerId: og.customerId,
        })),
      )
    }
  }, [officeGroups])

  if (officeGroupsValidating) return <Loader />

  const toggleOfficeGroupsToAdd = (customerId: string) => {
    officeGroupsToAdd.includes(customerId)
      ? setOfficeGroupsToAdd(officeGroupsToAdd.filter(item => item !== customerId))
      : setOfficeGroupsToAdd([...officeGroupsToAdd, customerId])
  }
  const toggleOfficeGroupsToRemove = (customerId: string) => {
    officeGroupsToRemove.includes(customerId)
      ? setOfficeGroupsToRemove(officeGroupsToRemove.filter(item => item !== customerId))
      : setOfficeGroupsToRemove([...officeGroupsToRemove, customerId])
  }

  const ToggleOfficeGroupSelectionCell = ({ cell: { value } }) => {
    const previouslyInstalledForOfficeGroup =
      installations && installations.data && !!installations.data.find(i => i.customerId === value)
    const checked =
      (previouslyInstalledForOfficeGroup && !officeGroupsToRemove.includes(value)) ||
      (!previouslyInstalledForOfficeGroup && officeGroupsToAdd.includes(value))

    return (
      <div className="field field-checkbox mb-0 control">
        <input
          className="checkbox"
          type="checkbox"
          id={value}
          checked={checked}
          onChange={() => {
            previouslyInstalledForOfficeGroup ? toggleOfficeGroupsToRemove(value) : toggleOfficeGroupsToAdd(value)
          }}
        />
        <label className="label" htmlFor={value}>
          Installed - ({value})
        </label>
      </div>
    )
  }

  return (
    <Section>
      <FadeIn>
        <Table
          data={officeGroupsTableData ? officeGroupsTableData : []}
          columns={[
            {
              Header: 'Group Name',
              accessor: 'name',
            },
            { Header: 'Office List', accessor: 'officeIds', Cell: OfficeListCell },
            {
              Header: 'Edit',
              accessor: 'customerId',
              Cell: ToggleOfficeGroupSelectionCell,
            },
          ]}
        />
      </FadeIn>
    </Section>
  )
}

export default AppInstallationPerOfficeGroup
