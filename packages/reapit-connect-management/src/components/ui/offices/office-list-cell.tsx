import React from 'react'
import useSWR from 'swr'
import { URLS } from '../../../constants/api'
import { Loader } from '@reapit/elements'

export const OfficeName: React.FC<{ id: string; isLast: boolean }> = ({ id, isLast }) => {
  const { data }: any = useSWR(id && `${URLS.OFFICES}/${id}`)
  if (!data) return <Loader body={false} />
  const { name } = data
  return <span>{name ? `${name}${isLast ? '' : ','}` : ''}</span>
}

const OfficeListCell = ({ cell: { value } }) => {
  const officeArr = value.split(', ')
  return (
    <>
      {officeArr.map((id: string, index: number) => (
        <OfficeName id={id} isLast={index === officeArr.length - 1} key={id} />
      ))}
    </>
  )
}
export default OfficeListCell
