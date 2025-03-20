import React, { Dispatch, FC, useContext, useEffect, useState } from 'react'
import { Installation, Repository } from './types'
import { GithubAccessToken, GithubContext } from '../../github'
import {
  LevelEl,
  LoadingContentEl,
  PaginatedListEl,
  paginationFix,
  RepositoryEl,
  RepositorySelectionActive,
  RepositorySelectionEl,
} from './__styles__'
import { Button, elMb6, Loader, Pagination, Title } from '@reapit/elements'
import { cx } from '@linaria/core'

type PageData = {
  total_pages: number
  per_page: number
  current_page: number
}

const fetchRepositories = async ({
  githubAccessToken,
  installation,
  setRepositories,
  setLoading,
  pageData,
  setPageData,
}: {
  githubAccessToken: GithubAccessToken
  setRepositories: Dispatch<Repository[]>
  setLoading: Dispatch<boolean>
  installation: Installation
  setPageData: Dispatch<PageData>
  pageData: PageData
}) => {
  setLoading(true)

  const result = await fetch(
    `https://api.github.com/user/installations/${installation.id}/repositories?page=${pageData.current_page}&per_page=${pageData.per_page}`,
    {
      headers: {
        authorization: `${githubAccessToken.token_type} ${githubAccessToken.access_token}`,
      },
    },
  )
  const data = await result.json()
  setLoading(false)

  setRepositories(data.repositories)
  const total_pages = Math.ceil(data.total_count / pageData.per_page)

  setPageData({
    ...pageData,
    total_pages,
  })
}

export const RepositorySelection: FC<{
  installation: Installation
  back: Dispatch<undefined>
  complete: (selectedRepo: Repository) => void
}> = ({ back, installation, complete }) => {
  const [repositories, setRepositories] = useState<Repository[] | undefined>()
  const { githubSession } = useContext(GithubContext)
  const [loading, setLoading] = useState<boolean>(false)
  const [pageData, setPageData] = useState<PageData>({
    total_pages: 0,
    per_page: 20,
    current_page: 1,
  })
  const [selectedRepository, setSelectedRepository] = useState<undefined | Repository>()

  useEffect(() => {
    fetchRepositories({
      githubAccessToken: githubSession as GithubAccessToken,
      setRepositories,
      setLoading,
      installation,
      pageData,
      setPageData,
    })
  }, [])

  return (
    <div>
      <LevelEl>
        <Button
          onClick={() => {
            setSelectedRepository(undefined)
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
      <PaginatedListEl className={cx(elMb6)}>
        {loading && (
          <LoadingContentEl>
            <Loader />
          </LoadingContentEl>
        )}
        {repositories && (
          <div key={pageData.current_page}>
            {repositories.map((repo) => (
              <RepositorySelectionEl
                className={cx(selectedRepository?.id === repo.id && RepositorySelectionActive)}
                onClick={() => setSelectedRepository(repo)}
                key={repo.id}
              >
                {repo.full_name}
              </RepositorySelectionEl>
            ))}
          </div>
        )}
      </PaginatedListEl>
      {pageData.total_pages > 1 && (
        <Pagination
          className={cx(paginationFix)}
          currentPage={pageData.current_page}
          numberPages={pageData.total_pages}
          callback={async (current_page) => {
            await fetchRepositories({
              githubAccessToken: githubSession as GithubAccessToken,
              setRepositories,
              setLoading,
              installation,
              pageData: { ...pageData, current_page },
              setPageData,
            })
          }}
        />
      )}
      <Button
        onClick={(event) => {
          event.preventDefault()
          selectedRepository && complete(selectedRepository)
        }}
        disabled={!selectedRepository}
        intent="primary"
      >
        {selectedRepository ? `Use ${selectedRepository.full_name}` : 'Done'}
      </Button>
    </div>
  )
}
