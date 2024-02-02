import { bootstrap } from '../server'
import request from 'supertest-graphql'
import gql from 'graphql-tag'
import MockAdapter from 'axios-mock-adapter'
import { createPlatformAxiosInstance } from '../axios'
import { AxiosInstance } from 'axios'

describe('GQL schema is generated', () => {
  let server
  let axiosInstance: AxiosInstance

  beforeAll(async () => {
    axiosInstance = createPlatformAxiosInstance()
    server = await bootstrap(axiosInstance)
  })

  it('Can get applicants', async () => {
    const mock = new MockAdapter(axiosInstance)
    mock.onAny().reply(() => {
      return [
        200,
        {
          _embedded: [
            {
              id: 'test-id',
            },
          ],
        },
      ]
    })

    const { data } = await request<any>(server)
      .set('authorization', 'my token')
      .query(gql`
        query {
          get_applicants_ {
            _embedded {
              id
            }
          }
        }
      `)
      .expectNoErrors()

    expect(data.get_applicants_).toBeDefined()
    expect(data.get_applicants_._embedded).toBeDefined()
    expect(data.get_applicants_._embedded[0]).toBeDefined()
    expect(data.get_applicants_._embedded[0].id).toBeDefined()
  })
})
