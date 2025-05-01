import React from 'react'
import { render } from '../../../../../tests/react-testing'
import { DnsConfiguration } from '../dns-configuration'
import { LoginIdentity } from '@reapit/connect-session'

jest.mock('@reapit/use-reapit-data', () => ({
  ...jest.requireActual('@reapit/use-reapit-data'),
  useReapitGet: jest.fn(),
}))

import { useReapitGet } from '@reapit/use-reapit-data'

describe('DNS Configuration', () => {
  it('Will show configuration page when dns info is returned', () => {
    ;(useReapitGet as jest.Mock).mockImplementationOnce(() => [
      {
        customDomain: 'https://custom-domain.reapit.cloud',
        cloudfrontUrl: 'dfgdfgdfg.cloudfront.com',
        certificate: {
          DomainValidationOptions: [
            {
              ResourceRecord: {
                Name: 'dns record name',
                Value: 'dns record value',
                Type: 'CNAME',
              },
            },
          ],
        },
      },
    ])

    expect(
      render(
        <DnsConfiguration
          pipelineId="pipelineId"
          connectSession={{
            accessToken: 'accessToken',
            refreshToken: 'refreshToken',
            idToken: 'idToken',
            loginIdentity: {} as LoginIdentity,
          }}
        />,
      ),
    ).toMatchSnapshot()
  })

  it('Will show setup domain model component', () => {
    ;(useReapitGet as jest.Mock).mockImplementationOnce(() => [undefined])

    expect(
      render(
        <DnsConfiguration
          pipelineId="pipelineId"
          connectSession={{
            accessToken: 'accessToken',
            refreshToken: 'refreshToken',
            idToken: 'idToken',
            loginIdentity: {} as LoginIdentity,
          }}
        />,
      ),
    ).toMatchSnapshot()
  })
})
