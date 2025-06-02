import React, { FC } from 'react'
import { BodyText, Button, ButtonGroup, Modal, useModal } from '@reapit/elements'
import { GetActionNames, getActions, useReapitGet } from '@reapit/use-reapit-data'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { OrganisationModelPagedResult, UserModel } from '@reapit/foundations-ts-definitions'
import { DisplayChip } from './__styles__'

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
        {orgs?._embedded?.map((org) => (
          <DisplayChip key={org.id}>
            {org.name}: {org.id}
          </DisplayChip>
        ))}
        <ButtonGroup alignment="right">
          <Button onClick={closeModal}>Cancel</Button>
        </ButtonGroup>
      </Modal>
    </>
  )
}
