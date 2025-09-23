import { ReapitConnectSession } from '@reapit/connect-session'
import React from 'react'
import { render } from '../../../tests/react-testing'
import { PipelineRow } from '../pipeline-row'

describe('PipelineRow', () => {
  it('should match snapshot', () => {
    expect(
      render(
        <PipelineRow
          connectSession={
            {
              loginIdentity: {
                developerId: '',
              },
            } as ReapitConnectSession
          }
          pipeline={{
            buildStatus: 'IN_PROGRESS',
            runtime: 'NODE_16',
          }}
        />,
      ),
    ).toMatchSnapshot()
  })
})
