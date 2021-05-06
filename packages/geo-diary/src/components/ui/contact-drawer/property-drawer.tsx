import React, { FC } from 'react'
import { DrawerHeader } from '../drawer'
import { useAppState } from '../../../core/app-state'
import { handleClose } from './index'
import TextRow from './text-row'

export const PropertyDrawer: FC = () => {
  const { appState, setAppState } = useAppState()
  const { appointment } = appState

  const property = appointment?.property
  const address = property?.address

  if (!appointment || !property) return null

  const { viewingArrangements, notes } = property
  const { description } = appointment
  return (
    <>
      {address && (
        <>
          <DrawerHeader title="Property Information" handleClose={handleClose(setAppState)} />
          {address && (
            <TextRow
              label="Address"
              content={
                <>
                  {address.buildingName && <p>{address.buildingName}</p>}
                  {(address.buildingNumber || address.line1) && (
                    <p>
                      {address.buildingNumber ? `${address.buildingNumber}, ` : ''}
                      {address.line1}
                    </p>
                  )}
                  {address.line2 && <p>{address.line2}</p>}
                  {address.line3 && <p>{address.line3}</p>}
                  {address.line4 && <p>{address.line4}</p>}
                  {address.postcode && <p>{address.postcode}</p>}
                </>
              }
            />
          )}
        </>
      )}
      {description && <TextRow label="Appointment Notes" content={description} />}
      {viewingArrangements && <TextRow label="Viewing Arrangements" content={viewingArrangements} />}
      {notes && <TextRow label="Access Notes" content={notes} />}
    </>
  )
}
