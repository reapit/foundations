import * as React from 'react'
import { shallow } from 'enzyme'
import WebhookCreateModal, { WebhookCreateProps } from '../webhook-edit-modal'

const props: WebhookCreateProps = {
  appId: '',
  visible: true,
}

describe('WebhookCreateProps', () => {
  it('should match a snapshot', () => {
    expect(shallow(<WebhookCreateModal {...props} />)).toMatchSnapshot()
  })
})
