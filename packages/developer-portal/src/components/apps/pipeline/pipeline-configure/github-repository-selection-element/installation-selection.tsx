import React, { Dispatch, FC, SetStateAction, useContext, useEffect, useState } from 'react'
import { Installation } from './types'
import { GithubAccessToken, GithubContext } from '../../github'
import { LoadingContentEl, PaginatedListEl, paginationFix } from './__styles__'
import { BodyText, Button, elMb6, elMr6, FlexContainer, Loader, Pagination, Title } from '@reapit/elements'
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

export const InstallationSelection: FC<{
  setInstallation: Dispatch<Installation>
  setIsModelOpen: Dispatch<SetStateAction<boolean>>
}> = ({ setInstallation, setIsModelOpen }) => {
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
              <FlexContainer key={installation.id} isFlexAlignCenter>
                <img width="50px" height="auto" className={cx(elMr6)} src={installation.account.avatar_url} />
                <Button intent="primary" onClick={() => setInstallation(installation)}>
                  {installation.account.login}
                </Button>
              </FlexContainer>
            ))}
          </div>
        )}
      </PaginatedListEl>

      {pageData.total_pages > 1 && (
        <div className={elMb6}>
          <Pagination
            className={cx(paginationFix, elMb6)}
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
        </div>
      )}
      <Button onClick={() => setIsModelOpen(false)}>Close</Button>
    </div>
  )
}
