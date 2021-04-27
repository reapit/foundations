import React from 'react'
import { FadeIn } from '@reapit/elements'
import { OfficeModel } from '@reapit/foundations-ts-definitions'

const OfficeListCell = ({ cell: { value } }) => {
  const offices = value ?? []
  return (
    <>
      {offices.map(({ name, id }: OfficeModel) => (
        <FadeIn key={id}>
          <span>{`${name} `}</span>
        </FadeIn>
      ))}
    </>
  )
}
export default OfficeListCell
