// import { CognitoUserSession } from 'amazon-cognito-identity-js'
// import { mockCognitoUserSession } from '../__mocks__/cognito'
// import { getLoginSession } from '../../utils/cognito'
// import { cognitoRefreshSession } from '../refresh-user-session'

// jest.mock('amazon-cognito-identity-js', () => ({
//   CognitoUserPool: jest.fn(),
//   AuthenticationDetails: jest.fn(),
//   CognitoUser: jest.fn(() => ({
//     refreshSession: (_token: string, callback = (_err: Error | undefined, session: CognitoUserSession) => session) => {
//       return callback(undefined, mockCognitoUserSession)
//     }
//   }))
// }))

// describe('cognitoRefreshSession', () => {
//   it('should return a CognitoUserSession', async () => {
//     expect(await cognitoRefreshSession({ userName: 'bob@acme.com', refreshToken: 'MOCK_REFRESH_TOKEN' })).toEqual(
//       getLoginSession(mockCognitoUserSession)
//     )
//   })
// })
