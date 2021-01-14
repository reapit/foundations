import React from 'react'
import useSWR from 'swr'
import { URLS } from '../../../constants/api'
import { FadeIn } from '@reapit/elements'

export const OfficeName: React.FC<{ id: string; isLast: boolean }> = ({ id, isLast }) => {
  const { data }: any = useSWR(id && `${URLS.OFFICES}/${id}`)
  if (!data) return null
  const { name } = data

  return (
    <FadeIn>
      <span>{name ? `${name}${isLast ? '' : ', '}` : ''}</span>
    </FadeIn>
  )
}

const OfficeListCell = ({ cell: { value } }) => {
  const officeArr = value.split(',')
  return (
    <>
      {officeArr.map((id: string, index: number) => (
        <OfficeName id={id.trim()} isLast={index === officeArr.length - 1} key={id} />
      ))}
    </>
  )
}
export default OfficeListCell
