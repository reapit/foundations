import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { UserModel } from '@reapit/foundations-ts-definitions'
import { StringMap } from '@reapit/use-reapit-data'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { Button, elMb5 } from '@reapit/elements'
import { getPlatformApiUrl } from '@reapit/use-reapit-data/src/api-regions'
import { useReapitConnect } from '@reapit/connect-session'

interface DownloadUsersCSVProps {
  queryParams: StringMap
}

export const DownloadUsersCSVFunction = async ({
  setIsDownloading,
  filters,
  token,
}: {
  setIsDownloading: Dispatch<SetStateAction<boolean>>
  filters: StringMap
  token: string
}) => {
  const data: UserModel[] = []
  let page = 1
  let totalPageCount = 2

  const getPage = async (page: number): Promise<{ items: UserModel[]; page: number; totalPageCount: number }> => {
    const query = new URLSearchParams({
      ...filters,
      pageSize: '100',
      pageNumber: page.toString(),
    })
    const result = await fetch(`${getPlatformApiUrl()}/organisations/users?${query.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'api-version': 'latest',
      },
    })

    const body = await result.json()

    const items = body._embedded
    const totalPageCount = body.totalPageCount

    return {
      page: page + 1,
      items,
      totalPageCount,
    }
  }
  setIsDownloading(true)

  do {
    const { items, page: newPage, totalPageCount: newTotalPageCount } = await getPage(page)
    items.forEach((item) => data.push(item))

    totalPageCount = newTotalPageCount
    page = newPage
  } while (page <= totalPageCount)

  setIsDownloading(false)

  const dataForDownload = data.map((row) => [
    row.name,
    row.email,
    row.jobTitle ?? '',
    row.inactive ? 'Inactive' : 'Active',
  ])

  dataForDownload.unshift(['Name', 'Email', 'Job Title', 'Active'])

  const csv = dataForDownload
    .map((row) =>
      row
        .map(String)
        .map((value) => value.replaceAll('"', '""'))
        .map((value) => `"${value}"`)
        .join(','),
    )
    .join('\r\n')

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const button = document.createElement('a')
  button.href = url
  button.setAttribute('download', 'users.csv')
  button.click()
}

export const DownloadUsersCSV: FC<DownloadUsersCSVProps> = ({ queryParams }) => {
  const [isDownloading, setIsDownloading] = useState<boolean>(false)

  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  return (
    <Button
      className={elMb5}
      intent="primary"
      disabled={isDownloading}
      loading={isDownloading}
      onClick={() =>
        DownloadUsersCSVFunction({
          setIsDownloading,
          token: connectSession?.accessToken as string,
          filters: queryParams,
        })
      }
    >
      Download CSV
    </Button>
  )
}
