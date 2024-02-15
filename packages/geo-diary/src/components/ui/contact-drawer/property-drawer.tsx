import React, { FC } from 'react'
import { DrawerHeader } from '../drawer'
import { useAppState } from '../../../core/app-state'
import { handleClose } from './index'
import TextRow from './text-row'
import { elMb3, Label } from '@reapit/elements'
import { KeyMovementModel, KeysModel, NegotiatorModel, OfficeModel } from '@reapit/foundations-ts-definitions'
import { cx } from '@linaria/core'

export type KeyModel = KeysModel & {
  movements?: (KeyMovementModel & { checkOutToNegotiator?: NegotiatorModel; checkInNegotiator?: NegotiatorModel })[]
} & { office?: OfficeModel }

export interface KeyInfoProps {
  keyModel: KeyModel
}

export const KeyInfo: FC<KeyInfoProps> = ({ keyModel }) => {
  const { movements, modified, status, number, keysInSet, office } = keyModel
  const lastMovement = movements ? movements[movements.length - 1] : undefined

  const modifiedDate = modified ? new Date(modified) : undefined
  const lastModified = modifiedDate
    ? `${modifiedDate.getDate().toString().padStart(2, '0')}/${(modifiedDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}/${modifiedDate.getFullYear()} ${modifiedDate.getHours()}:${modifiedDate.getMinutes()}`
    : undefined

  const statusName = lastModified
    ? `${status === 'checkedOut' ? 'Checked out' : 'Checked in'} at ${lastModified || 'unknown'}${
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
      <Label>Key Number</Label>
      <p className={cx(elMb3)}>{number}</p>
      <Label>Keys in set</Label>
      <div className={cx(elMb3)}>{keysInSet?.map((set) => <p key={set.name}>{set.name}</p>)}</div>
      {office && (
        <>
          <Label>Office</Label>
          <p className={cx(elMb3)}>{office.name}</p>
        </>
      )}
      <Label>Status</Label>
      <p className={cx(elMb3)}>{statusName}</p>
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

  const { description } = appointment
  const { viewingArrangements, notes, selling, letting } = property
  const displayPrice = selling?.price
    ? `£${selling.price}`
    : letting?.rent
      ? `£${letting.rent} ${letting.rentFrequency ? `/ ${letting.rentFrequency}` : ''}`
      : null

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
      {displayPrice && <TextRow label="Price" content={displayPrice} />}
      {description && <TextRow label="Appointment Notes" content={description} />}
      {viewingArrangements && <TextRow label="Viewing Arrangements" content={viewingArrangements} />}
      {keys?.length ? (
        <TextRow
          label=""
          content={
            <ul>
              {keys.map((key) => (
                <li key={key.id}>
                  <KeyInfo keyModel={key} />
                </li>
              ))}
            </ul>
          }
        />
      ) : null}
      {notes && <TextRow label="Access Notes" content={notes} />}
    </>
  )
}
