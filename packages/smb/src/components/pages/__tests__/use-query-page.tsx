import * as React from 'react'
import { Router as BrowserRouter } from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import { MockedProvider } from '@apollo/react-testing'
import { Alert, Loader } from '@reapit/elements'
import { history } from '../../../core/router'
import { UseQueryPage, UseQueryPageProps, MOCK_QUERY } from '../use-query-page'

const props: UseQueryPageProps = {}

describe('UseQueryPage', () => {
  it('should match a snapshot', () => {
    const mocks = [
      {
        request: {
          query: MOCK_QUERY,
        },
        result: {
          data: {
            GetContacts: { __typename: 'ContactModel', id: '123', title: 'Levy' },
          },
        },
      },
    ]

    expect(
      toJson(
        shallow(
          <MockedProvider mocks={mocks} addTypename={false}>
            <UseQueryPage {...props} />
          </MockedProvider>,
        ),
      ),
    ).toMatchSnapshot()
  })

  it('should render loading state initially', () => {
    const wrapper = mount(
      <BrowserRouter history={history}>
        <MockedProvider mocks={[]} addTypename={false}>
          <UseQueryPage {...props} />
        </MockedProvider>
      </BrowserRouter>,
    )
    setTimeout(() => {
      expect(wrapper.find(Loader).length).toEqual(1)
    }, 0)
  })

  it('should render after call api', async () => {
    const mocks = [
      {
        request: {
          query: MOCK_QUERY,
        },
        result: {
          data: {
            GetContacts: { __typename: 'ContactModel', id: '123', title: 'Levy' },
          },
        },
      },
    ]

    const wrapper = mount(
      <BrowserRouter history={history}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <UseQueryPage {...props} />
        </MockedProvider>
      </BrowserRouter>,
    )

    setTimeout(() => {
      expect(wrapper.find(<Alert message={'Levy'} type="success" />).length).toEqual(1)
    }, 2000)
  })

  it('should show error UI', async () => {
    const mocks = [
      {
        request: {
          query: MOCK_QUERY,
        },
        error: new Error('aw shucks'),
      },
      {
        request: {
          query: MOCK_QUERY,
        },
        result: {
          data: {
            GetContacts: { __typename: 'ContactModel', id: '123', title: 'Levy' },
          },
        },
      },
    ]

    const wrapper = mount(
      <BrowserRouter history={history}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <UseQueryPage {...props} />
        </MockedProvider>
      </BrowserRouter>,
    )

    setTimeout(() => {
      expect(wrapper.find(<Alert message="Error" type="danger" />).length).toEqual(1)
    }, 2000)
  })
})
