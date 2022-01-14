import React, { FC } from 'react'
import { DrawerHeader } from '../drawer'
import { useAppState } from '../../../core/app-state'
import { handleClose } from './index'
import TextRow from './text-row'
import { elMb3, Label } from '@reapit/elements'
import { KeyMovementModel, KeysModel, NegotiatorModel, OfficeModel } from '@reapit/foundations-ts-definitions'
import { cx } from '@linaria/utils'

const KeyInfo = ({
  keyModal,
}: {
  keyModal: KeysModel & {
    movements?: (KeyMovementModel & { checkOutToNegotiator?: NegotiatorModel; checkInNegotiator?: NegotiatorModel })[]
  } & { office?: OfficeModel }
}) => {
  const lastMovement = keyModal.movements ? keyModal.movements[keyModal.movements.length - 1] : undefined

  const modified = keyModal.modified ? new Date(keyModal.modified) : undefined
  const lastModified = modified
    ? `${modified.getDate().toString().padStart(2, '0')}/${(modified.getMonth() + 1)
        .toString()
        .padStart(2, '0')}/${modified.getFullYear()} ${modified.getHours()}:${modified.getMinutes()}`
    : undefined

  const status = lastModified
    ? `${keyModal.status === 'checkedOut' ? 'checked out' : 'checked in'} at ${lastModified || 'unknown'}${
        lastMovement
          ? ` by ${
              lastMovement?.checkOutToNegotiator?.name
                ? lastMovement.checkOutToNegotiator?.name
                : lastMovement?.checkInNegotiator?.name
                ? lastMovement?.checkInNegotiator?.name
                : ''
            }`
          : ''
      }`
    : null

  return (
    <>
      <Label>Number</Label>
      <p className={cx(elMb3)}>{keyModal.number}</p>
      <Label>Keys in set</Label>
      <div className={cx(elMb3)}>
        {keyModal.keysInSet?.map((set) => (
          <p key={set.name}>{set.name}</p>
        ))}
      </div>
      {keyModal?.office && (
        <>
          <Label>Office</Label>
          <p className={cx(elMb3)}>{keyModal?.office.name}</p>
        </>
      )}
      <Label>Status</Label>
      <p className={cx(elMb3)}>{status}</p>
    </>
  )
}

export const PropertyDrawer: FC = () => {
  const { appState, setAppState } = useAppState()
  const { appointment } = appState

  const property = appointment?.property
  const address = property?.address
  const keys = property?.keys

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
      {keys && (
        <TextRow
          label="Keys"
          content={
            <ul>
              {keys.map((key) => (
                <li key={key.id}>
                  <KeyInfo keyModal={key} />
                </li>
              ))}
            </ul>
          }
        />
      )}
      {notes && <TextRow label="Access Notes" content={notes} />}
    </>
  )
}
