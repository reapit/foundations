import React, { Dispatch, FC, useContext, useEffect, useState } from 'react'
import { Installation, Repository } from './types'
import { GithubAccessToken, GithubContext } from '../../github'
import { LevelEl, RepositoryEl, RepositorySelectionActive, RepositorySelectionEl } from './__styles__'
import { Button, elMb6, Loader, Title } from '@reapit/elements'
import { cx } from '@linaria/core'

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

export const RepositorySelection: FC<{
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
