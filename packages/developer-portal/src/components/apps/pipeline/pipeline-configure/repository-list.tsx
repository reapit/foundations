import React, { Dispatch, FC, useContext, useEffect, useState } from 'react'
import { GithubAccessToken, GithubContext } from '../github'
import { BodyText, Button, elMb6, Loader, Modal, Title } from '@reapit/elements'
import {
  InstallationSelectionEl,
  LevelEl,
  RepositoryEl,
  RepositorySelectionActive,
  RepositorySelectionEl,
  SelectedRepositoryEl,
} from './__styles__'
import { cx } from '@linaria/core'

type Installation = {
  id: number
  account: {
    id: number
    login: string
    avatar_url: string
    html_url: string
  }
  app_id: number
  access_tokens_url: string
}

type Repository = {
  id: number
  name: string
  full_name: string
  description: string
  html_url: string
  visibility: string
}

const fetchInstallations = async (
  githubAccessToken: GithubAccessToken,
  setInstallations: Dispatch<Installation[]>,
  setLoading: Dispatch<boolean>,
) => {
  setLoading(true)
  const result = await fetch('https://api.github.com/user/installations', {
    method: 'get',
    headers: {
      authorization: `${githubAccessToken.token_type} ${githubAccessToken.access_token}`,
    },
  })
  setLoading(false)

  const installations = await result.json()

  setInstallations(installations.installations)
}

const fetchRepositories = async (
  githubAccessToken: GithubAccessToken,
  setRepositories: Dispatch<Repository[]>,
  setLoading: Dispatch<boolean>,
  installation: Installation,
) => {
  setLoading(true)

  const result = await fetch(`https://api.github.com/user/installations/${installation.id}/repositories`, {
    headers: {
      authorization: `${githubAccessToken.token_type} ${githubAccessToken.access_token}`,
    },
  })
  const data = await result.json()
  setLoading(false)

  setRepositories(data.repositories)
}

const InstallationSelection: FC<{ setInstallation: Dispatch<Installation> }> = ({ setInstallation }) => {
  const [installations, setInstallations] = useState<Installation[] | undefined>()
  const { githubAccessToken } = useContext(GithubContext)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    fetchInstallations(githubAccessToken as GithubAccessToken, setInstallations, setLoading)
  }, [])

  return (
    <div>
      <Title>Installation Selection</Title>
      <BodyText hasGreyText>Select an organisation or user to fetch repositories for.</BodyText>
      {loading && <Loader />}
      {installations &&
        installations?.map((installation) => (
          <InstallationSelectionEl key={installation.id} onClick={() => setInstallation(installation)}>
            <img src={installation.account.avatar_url} />
            <p>{installation.account.login}</p>
          </InstallationSelectionEl>
        ))}
    </div>
  )
}

const RepositorySelection: FC<{
  installation: Installation
  selectedRepository?: Repository
  setRepository: Dispatch<Repository | undefined>
  back: Dispatch<undefined>
  complete: () => void
}> = ({ back, installation, setRepository, selectedRepository, complete }) => {
  const [repositories, setRepositories] = useState<Repository[] | undefined>()
  const { githubAccessToken } = useContext(GithubContext)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    fetchRepositories(githubAccessToken as GithubAccessToken, setRepositories, setLoading, installation)
  }, [])

  // TODO need pagination implementation

  return (
    <div>
      <LevelEl>
        <Button
          onClick={() => {
            setRepository(undefined)
            back(undefined)
          }}
        >
          Back
        </Button>
        <Title>Repository Selection</Title>
      </LevelEl>
      <RepositoryEl>
        <img src={installation.account.avatar_url} />
        <p className="repository-name">{installation.account.login}</p>
      </RepositoryEl>
      {loading && <Loader />}
      <div className={cx(elMb6)}>
        {repositories &&
          repositories.map((repo) => (
            <RepositorySelectionEl
              className={cx(selectedRepository?.id === repo.id && RepositorySelectionActive)}
              onClick={() => setRepository(repo)}
              key={repo.id}
            >
              {repo.full_name}
            </RepositorySelectionEl>
          ))}
      </div>
      <Button
        onClick={(event) => {
          event.preventDefault()
          complete()
        }}
        disabled={!selectedRepository}
        intent="primary"
      >
        Done
      </Button>
    </div>
  )
}

const resolveValue = ({
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

export const RepositoryList: FC<{
  value?: { installationId: number; repositoryUrl: string; repositoryId: number }
  placeholder?: string
  onChange?: (value: { repository: Repository; installation: Installation }) => void
}> = ({ value, onChange, placeholder }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
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
                loginWithGithub(window.location.pathname)
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
        {resolveValue({
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
