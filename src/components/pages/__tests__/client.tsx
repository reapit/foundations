import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Client, ClientProps } from '../client'
import { appsDataStub } from '@/sagas/__stubs__/apps'

const props: ClientProps = {
  clientState: {
    loading: false,
    clientData: appsDataStub
  },
  // @ts-ignore: just pick the needed props for the test
  match: {
    params: {
      page: '2'
    }
  }
}

describe('Client', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<Client {...props} />))).toMatchSnapshot()
  })
})
