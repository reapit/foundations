import React, { FC, useContext, useEffect, useState } from 'react'
import { GithubContext } from '../../github'
import { Button, Modal, Title } from '@reapit/elements'
import { SelectedRepositoryEl } from './__styles__'
import { Installation, Repository } from './types'
import { InstallationSelection } from './installation-selection'
import { RepositorySelection } from './repository-selection'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../../../../core/connect-session'

export const resolveDisplayValue = ({
  repositoryUrl,
  defaultValue,
  placeholder,
}: {
  repositoryUrl?: string
  defaultValue?: string
  placeholder?: string
}): string => {
  return repositoryUrl || defaultValue || placeholder || 'Not Selected'
}

export const GithubRepositorySelectionElement: FC<{
  value?: { installationId: number; repositoryUrl: string; repositoryId: number }
  placeholder?: string
  onChange?: (value: { repository: Repository; installation: Installation }) => void
}> = ({ value, onChange, placeholder }) => {
  const params = new URLSearchParams(window.location.search)
  const githubModalOpen = params.get('githubModalOpen')
  const [isModalOpen, setIsModalOpen] = useState<boolean>(githubModalOpen === 'true')
  const [selectedInstallation, setSelectedInstallation] = useState<Installation | undefined>()
  const [selectedRepository, setSelectedRepository] = useState<Repository | undefined>()
  const { authenticatedWithGithub, loginWithGithub, githubAuthenticating } = useContext(GithubContext)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  const completeAction = (selected) => {
    setIsModalOpen(false)
    setSelectedRepository(selected)
  }

  useEffect(() => {
    onChange &&
      selectedRepository &&
      selectedInstallation &&
      onChange({
        repository: selectedRepository as Repository,
        installation: selectedInstallation as Installation,
      })
  }, [selectedRepository])

  return (
    <>
      <Modal isOpen={isModalOpen} onModalClose={() => setIsModalOpen(false)}>
        {!authenticatedWithGithub ? (
          <>
            <Title>Repository Selection</Title>
            {connectSession && (
              <Button
                disabled={githubAuthenticating}
                loading={githubAuthenticating}
                onClick={(event) => {
                  event.preventDefault()
                  loginWithGithub(connectSession, `${window.location.pathname}?githubModalOpen=true`)
                }}
              >
                Login with Github to continue
              </Button>
            )}
          </>
        ) : !selectedInstallation ? (
          <InstallationSelection setInstallation={setSelectedInstallation} />
        ) : (
          <RepositorySelection
            complete={completeAction}
            back={setSelectedInstallation}
            installation={selectedInstallation}
          />
        )}
      </Modal>
      <SelectedRepositoryEl
        onClick={(event) => {
          event.preventDefault()
          setIsModalOpen(true)
        }}
      >
        {resolveDisplayValue({
          repositoryUrl: selectedRepository?.full_name
            ? `https://github.com/${selectedRepository.full_name}`
            : undefined,
          defaultValue: value?.repositoryUrl,
          placeholder,
        })}
      </SelectedRepositoryEl>
    </>
  )
}
