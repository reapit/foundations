import { ForbiddenException } from "@homeservenow/serverless-aws-handler"
import { ownership } from "../ownership"

const DEVELOPER_ID = 'DEVELOPER_ID'

describe('ownership', () => {
  it('Can reject if not match', () => {
    try {
      ownership(DEVELOPER_ID, 'fail')
    } catch(e) {
      expect(e).toBeInstanceOf(ForbiddenException)
    }
  })

  it('Can successfully pass ownership check', () => {
    try {
      ownership(DEVELOPER_ID, DEVELOPER_ID)
      expect(true).toBeTruthy()
    } catch(e) {
      expect(false).toBeTruthy()
    }
  })
})
