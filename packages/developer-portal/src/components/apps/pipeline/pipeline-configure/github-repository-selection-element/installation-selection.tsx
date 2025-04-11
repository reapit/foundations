import React, { Dispatch, FC, useContext, useEffect, useState } from 'react'
import { Installation } from './types'
import { GithubAccessToken, GithubContext } from '../../github'
import { InstallationSelectionEl, LoadingContentEl, PaginatedListEl, paginationFix } from './__styles__'
import { BodyText, elMb6, Loader, Pagination, Title } from '@reapit/elements'
import { cx } from '@linaria/core'

type PageData = {
  total_pages: number
  per_page: number
  current_page: number
}

const fetchInstallations = async ({
  githubAccessToken,
  setInstallations,
  setLoading,
  setPageData,
  pageData,
}: {
  githubAccessToken: GithubAccessToken
  setInstallations: Dispatch<Installation[]>
  setLoading: Dispatch<boolean>
  setPageData: Dispatch<PageData>
  pageData: PageData
}) => {
  setLoading(true)
  const result = await fetch(
    `https://api.github.com/user/installations?page=${pageData.current_page}&per_page=${pageData.per_page}`,
    {
      method: 'get',
      headers: {
        authorization: `${githubAccessToken.token_type} ${githubAccessToken.access_token}`,
      },
    },
  )
  setLoading(false)

  const data = await result.json()

  setInstallations(data.installations)
  const total_pages = Math.ceil(data.total_count / pageData.per_page)

  setPageData({
    ...pageData,
    total_pages,
  })
}

export const InstallationSelection: FC<{ setInstallation: Dispatch<Installation> }> = ({ setInstallation }) => {
  const [installations, setInstallations] = useState<Installation[] | undefined>()
  const { githubSession } = useContext(GithubContext)
  const [loading, setLoading] = useState<boolean>(false)
  const [pageData, setPageData] = useState<PageData>({
    total_pages: 0,
    per_page: 20,
    current_page: 1,
  })

  useEffect(() => {
    fetchInstallations({
      githubAccessToken: githubSession as GithubAccessToken,
      setInstallations,
      setLoading,
      setPageData,
      pageData,
    })
  }, [])

  return (
    <div>
      <Title>Installation Selection</Title>
      <BodyText hasGreyText>Select an organisation or user to fetch repositories for.</BodyText>

      <PaginatedListEl className={cx(elMb6)}>
        {loading && (
          <LoadingContentEl>
            <Loader />
          </LoadingContentEl>
        )}
        {installations && (
          <div key={pageData.current_page}>
            {installations?.map((installation) => (
              <InstallationSelectionEl key={installation.id} onClick={() => setInstallation(installation)}>
                <img src={installation.account.avatar_url} />
                <p>{installation.account.login}</p>
              </InstallationSelectionEl>
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
            await fetchInstallations({
              githubAccessToken: githubSession as GithubAccessToken,
              setInstallations,
              setLoading,
              pageData: { ...pageData, current_page },
              setPageData,
            })
          }}
        />
      )}
    </div>
  )
}
