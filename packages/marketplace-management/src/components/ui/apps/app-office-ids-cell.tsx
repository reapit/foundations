import React from 'react'
import { FadeIn } from '@reapit/elements'

interface AppOfficeIdsCellProps {
  cell: {
    value?: string
  }
}

export const AppOfficeIdsCell = ({ cell: { value } }: AppOfficeIdsCellProps) => {
  const officeIds = value ? value.split(',') : []
  return (
    <>
      {officeIds.map((officeId: string) => (
        <FadeIn key={officeId}>
          <span>{`${officeId} `}</span>
        </FadeIn>
      ))}
    </>
  )
}
