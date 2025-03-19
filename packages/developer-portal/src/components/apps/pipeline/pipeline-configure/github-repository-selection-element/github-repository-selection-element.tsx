import React, { FC, useContext, useState } from 'react'
import { GithubContext } from '../../github'
import { Button, Modal, Title } from '@reapit/elements'
import { SelectedRepositoryEl } from './__styles__'
import { Installation, Repository } from './types'
import { InstallationSelection } from './installation-selection'
import { RepositorySelection } from './repository-selection'

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
  const { githubAccessToken, loginWithGithub } = useContext(GithubContext)

  const completeAction = () => {
    setIsModalOpen(false)
    onChange &&
      onChange({
        repository: selectedRepository as Repository,
        installation: selectedInstallation as Installation,
      })
  }

  return (
    <>
      <Modal isOpen={isModalOpen} onModalClose={() => setIsModalOpen(false)}>
        {!githubAccessToken ? (
          <>
            <Title>Repository Selection</Title>
            <Button
              onClick={(event) => {
                event.preventDefault()
                loginWithGithub(`${window.location.pathname}?githubModalOpen=true`)
              }}
            >
              Login with Github to continue
            </Button>
          </>
        ) : !selectedInstallation ? (
          <InstallationSelection setInstallation={setSelectedInstallation} />
        ) : (
          <RepositorySelection
            complete={completeAction}
            selectedRepository={selectedRepository}
            back={setSelectedInstallation}
            installation={selectedInstallation}
            setRepository={setSelectedRepository}
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
