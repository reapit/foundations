import React, { Dispatch, FC, useContext, useEffect, useState } from 'react'
import { Installation } from './types'
import { GithubAccessToken, GithubContext } from '../../github'
import { InstallationSelectionEl } from './__styles__'
import { BodyText, Loader, Title } from '@reapit/elements'

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

export const InstallationSelection: FC<{ setInstallation: Dispatch<Installation> }> = ({ setInstallation }) => {
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
