import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { UserModelPagedResult } from '@reapit/foundations-ts-definitions'
import { useReapitGet, GetActionNames, getActions, StringMap } from '@reapit/use-reapit-data'
import FileSaver from 'file-saver'
import Papa from 'papaparse'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { Button, elMb5 } from '@reapit/elements'

interface DownloadUsersCSVProps {
  queryParams: StringMap
}

export const handleDownloadUsers =
  (users: UserModelPagedResult | null, isDownloading: boolean, setIsDownloading: Dispatch<SetStateAction<boolean>>) =>
  () => {
    const downloadUsers = () => {
      const csv = Papa.unparse({
        fields: ['Name', 'Email', 'Job Title', 'Active'],
        data: users?._embedded?.map(({ name, email, jobTitle, inactive }) => [name, email, jobTitle, !inactive]) || [],
      })

      const blob = new Blob([csv], { type: 'data:text/csv;charset=utf-8,' })
      FileSaver.saveAs(blob, 'users.csv')

      setIsDownloading(false)
    }

    if (isDownloading && users) {
      downloadUsers()
    }
  }

export const handleSetDownloading = (setIsDownloading: Dispatch<SetStateAction<boolean>>) => () => {
  setIsDownloading(true)
}

export const DownloadUsersCSV: FC<DownloadUsersCSVProps> = ({ queryParams }) => {
  const [isDownloading, setIsDownloading] = useState<boolean>(false)

  const [users] = useReapitGet<UserModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getUsers],
    queryParams: {
      ...queryParams,
      pageSize: 9999,
      pageNumber: 1,
    },
    fetchWhenTrue: [queryParams, isDownloading],
  })

  useEffect(handleDownloadUsers(users, isDownloading, setIsDownloading), [isDownloading, users])

  return (
    <Button
      className={elMb5}
      intent="primary"
      disabled={isDownloading}
      loading={isDownloading}
      onClick={handleSetDownloading(setIsDownloading)}
    >
      Download CSV
    </Button>
  )
}
