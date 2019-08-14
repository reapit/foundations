import { transformObjectToDotNotation } from '@/utils/common'

describe('transformObjectToDotNotation run correctly', () => {
  it('run when input {}', () => {
    const input = {}
    const output = []
    const result = transformObjectToDotNotation(input)
    expect(result).toEqual(output)
  })
  it('run when input undefined', () => {
    const input = undefined
    const output = []
    const result = transformObjectToDotNotation(input)
    expect(result).toEqual(output)
  })
  it('run when input all true', () => {
    const input = {
      'Marketplace/developers': {
        read: true,
        write: true
      },
      'TestResourceServer/test': {
        scope: true
      }
    }
    const output = ['Marketplace/developers.read', 'Marketplace/developers.write', 'TestResourceServer/test.scope']

    const result = transformObjectToDotNotation(input)
    expect(result).toEqual(output)
  })
  it('run when input have false', () => {
    const input = {
      'Marketplace/developers': {
        read: true,
        write: false
      },
      'TestResourceServer/test': {
        scope: true
      }
    }
    const output = ['Marketplace/developers.read', 'TestResourceServer/test.scope']

    const result = transformObjectToDotNotation(input)
    expect(result).toEqual(output)
  })
})
