import React, { Dispatch, FC, useContext, useEffect, useState } from 'react'
import { GithubAccessToken, GithubContext } from '../github'
import { BodyText, Button, Loader, Modal, Title } from '@reapit/elements'
import {
  InstallationSelectionEl,
  LevelEl,
  RepositoryEl,
  RepositorySelectionEl,
  SelectedRepositoryEl,
} from './__styles__'

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
      {repositories &&
        repositories.map((repo) => (
          <RepositorySelectionEl onClick={() => setRepository(repo)} key={repo.id}>
            {repo.full_name}
          </RepositorySelectionEl>
        ))}
      <Button
        onClick={(event) => {
          event.preventDefault()
          complete()
        }}
        disabled={!selectedRepository}
        intent="primary"
      >
        Selected
      </Button>
    </div>
  )
}

export const RepositoryList: FC<{
  selected?: { installationId: number; appId: number; repositoryUr: string }
  onChange: (value: {}) => void
}> = ({ selected, onChange }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [selectedInstallation, setSelectedInstallation] = useState<Installation | undefined>()
  const [selectedRepository, setSelectedRepository] = useState<Repository | undefined>()

  const completeAction = () => {
    setIsModalOpen(false)
    onChange({
      // TODO add repositoryId, appId and repo url
    })
  }

  return (
    <>
      <Modal isOpen={isModalOpen} onModalClose={() => setIsModalOpen(false)}>
        {!selectedInstallation ? (
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
        {selectedRepository?.full_name || 'not selected'}
      </SelectedRepositoryEl>
    </>
  )
}
