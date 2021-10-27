export const useOrgId = jest.fn(() => ({
  orgIdState: {
    orgId: 'SOME_ID',
    orgName: 'SOME_NAME',
    orgClientId: 'SOME_CLIENT_ID',
    orgIdOptions: [
      { name: 'name', value: 'value' },
      { name: 'name', value: 'value' },
    ],
  },
  setOrgIdState: jest.fn(),
}))
