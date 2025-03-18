import React, { FC, useContext } from 'react'
import { BodyText, Button } from '@reapit/elements'

import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import { PipelineTabs } from './../pipeline-tabs'
import { GithubContext } from './../github'
import { PipelineConfigureForm } from './pipeline-configure-form'

export const PipelineConfigure: FC = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  const { githubAccessToken, loginWithGithub } = useContext(GithubContext)

  return (
    <>
      {!location.pathname.includes('new') && <PipelineTabs />}
      <BodyText hasGreyText>
        Tell us about how we should build your application here. We assume that your application is a front end app and
        that, it uses either yarn or npm to run scripts decalared in a package.json file. We assume also that your
        application is bundled and that bundle is output to a local directory that we can deploy for you.
      </BodyText>
      {!githubAccessToken ? (
        <Button
          onClick={() => {
            loginWithGithub(window.location.pathname)
          }}
        >
          Login with Github to continue
        </Button>
      ) : (
        <PipelineConfigureForm />
      )}
    </>
  )
}
