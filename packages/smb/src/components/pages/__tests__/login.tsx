import * as React from 'react'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import { MockedProvider } from '@apollo/react-testing'
import { Button } from '@reapit/elements'
import { Login, LoginProps, MOCK_QUERY, LOGIN_MUTATION } from '../login'

const props: LoginProps = {
  // @ts-ignore: ignore to fullfil the definition of RouteComponentProps
  location: {
    pathname: '/client',
  },
}

describe('Login', () => {
  describe('useQuery', () => {
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
              <Login {...props} />
            </MockedProvider>,
          ),
        ),
      ).toMatchSnapshot()
    })

    it('should render loading state initially', () => {
      const wrapper = mount(
        <MockedProvider mocks={[]} addTypename={false}>
          <Login {...props} />
        </MockedProvider>,
      )
      expect(wrapper.find('div').text()).toEqual('loading...')
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
        <MockedProvider mocks={mocks} addTypename={false}>
          <Login {...props} />
        </MockedProvider>,
      )

      setTimeout(() => {
        expect(wrapper.find('<p className="pb-8">graphql message: Levy</p>').length).toEqual(1)
      }, 1000)
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
        <MockedProvider mocks={mocks} addTypename={false}>
          <Login {...props} />
        </MockedProvider>,
      )

      setTimeout(() => {
        expect(wrapper.find('div').text()).toEqual('Error')
      }, 2000)
    })
  })

  // describe('useMutation', () => {
  //   it('should render loading state initially', async () => {
  //     // const deleteDog = { name: 'Buck', breed: 'Poodle', id: 1 }
  //     const mocks = [
  //       {
  //         request: {
  //           query: LOGIN_MUTATION,
  //           variables: { email: 'khacvy@yahoo.com', password: '123' },
  //         },
  //         result: { data: { token: 'Success' } },
  //       },
  //     ]

  //     const wrapper = mount(
  //       <MockedProvider mocks={mocks} addTypename={false}>
  //         <Login {...props} />
  //       </MockedProvider>,
  //     )
  //     await new Promise(r => setTimeout(r, 2000))
  //     const button = wrapper.find(Button)
  //     console.log('button', button)
  //     button.simulate('click')

  //     expect(wrapper.debug()).toEqual({})
  //   })
  // })


})
