import React, { FC } from 'react'
import { BodyText, Button, Chip, ChipGroup, Modal, useModal } from '@reapit/elements'
import { GetActionNames, getActions, useReapitGet } from '@reapit/use-reapit-data'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { OrganisationModelPagedResult, UserModel } from '@reapit/foundations-ts-definitions'

export const ViewOrganisations: FC<{ user: UserModel }> = ({ user }) => {
  const { modalIsOpen, openModal, closeModal } = useModal(user.id)
  const organisationsIds = user.organisationIds

  const [orgs, isLoading] = useReapitGet<OrganisationModelPagedResult>({
    action: getActions[GetActionNames.getOrgs],
    reapitConnectBrowserSession,
    fetchWhenTrue: [modalIsOpen],
    queryParams: {
      id: organisationsIds,
    },
  })

  return (
    <>
      <Button intent="primary" onClick={() => openModal()}>
        View Organsiations
      </Button>
      <Modal
        title="Organisations"
        isOpen={modalIsOpen}
        onModalClose={() => {
          closeModal()
        }}
      >
        <BodyText>Below is a list of organisations this user is associated with.</BodyText>
        <ChipGroup>
          {orgs?._embedded?.map((org) => (
            <Chip key={org.id}>
              {org.name}: {org.id}
            </Chip>
          ))}
        </ChipGroup>
      </Modal>
    </>
  )
}
