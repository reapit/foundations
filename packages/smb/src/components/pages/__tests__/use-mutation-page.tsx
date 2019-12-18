import * as React from 'react'
import { shallow, mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import toJson from 'enzyme-to-json'
import { MockedProvider } from '@apollo/react-testing'
import { Button } from '@reapit/elements'
import sleep from '@/utils/sleep'
import resolvers from '../../../core/__mocks__/resolvers'
import { UseMutationPage, UseMutationPageProps, LOGIN_MUTATION } from '../use-mutation-page'

const props: UseMutationPageProps = {}

describe('UseMutationPage', () => {
  it('should match a snapshot', () => {
    expect(
      toJson(
        shallow(
          <MockedProvider mocks={[]} addTypename={false}>
            <UseMutationPage {...props} />
          </MockedProvider>,
        ),
      ),
    ).toMatchSnapshot()
  })

  it('should render loading state initially', async () => {
    const mocks = [
      {
        request: {
          query: LOGIN_MUTATION,
          variables: { email: '', password: '' },
        },
        result: {
          data: {
            login: { token: '' },
          },
        },
      },
    ]

    const wrapper = mount(
      <MockedProvider mocks={mocks} resolvers={resolvers} addTypename={false}>
        <UseMutationPage {...props} />
      </MockedProvider>,
    )
    await act(async () => {
      wrapper.find(Button).simulate('submit')
    })
    await sleep(500)
    wrapper.update()
    expect(wrapper.find(Button).prop('loading')).toEqual(true)
  })
})
