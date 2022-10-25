import { adminReadonlyGroup, adminWriteGroup } from '../consts'
import { CredsType } from '../guards'
import { isAdmin, isReadonlyAdmin, isWriteAdmin } from '../helpers'

describe('is-admin', () => {
  it('readonly creds', () => {
    const result = isReadonlyAdmin({
      type: 'jwt',
      groups: [adminReadonlyGroup],
    } as CredsType)

    expect(result).toBeTruthy()
  })

  it('write creds', () => {
    const result = isReadonlyAdmin({
      type: 'jwt',
      groups: [adminWriteGroup],
    } as CredsType)

    expect(result).toBeTruthy()
  })

  it('any admin', () => {
    expect(
      isAdmin({
        type: 'jwt',
        groups: [adminWriteGroup],
      } as CredsType),
    ).toBeTruthy()

    expect(
      isAdmin({
        type: 'jwt',
        groups: [adminReadonlyGroup],
      } as CredsType),
    ).toBeTruthy()
  })

  it('readonly is not write', () => {
    expect(
      isWriteAdmin({
        type: 'jwt',
        groups: [adminReadonlyGroup],
      } as CredsType),
    ).toBeFalsy()
  })

  it('write is readonly', () => {
    expect(
      isWriteAdmin({
        type: 'jwt',
        groups: [adminWriteGroup],
      } as CredsType),
    ).toBeTruthy()
  })
})
