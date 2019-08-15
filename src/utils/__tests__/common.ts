import { transformObjectToDotNotation, transformDotNotationToObject } from '@/utils/common'

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

describe('transformDotNotationToObject run correctly', () => {
  it('run when input []', () => {
    const input = []
    const output = {}
    const result = transformDotNotationToObject(input)
    expect(result).toEqual(output)
  })
  it('run when input undefined', () => {
    const input = []
    const output = {}
    const result = transformDotNotationToObject(input)
    expect(result).toEqual(output)
  })
  it('run have input', () => {
    const input = [
      { name: 'Marketplace/developers.read' },
      { name: 'Marketplace/developers.write' },
      { name: 'TestResourceServer/test.scope' }
    ]
    const output = {
      'Marketplace/developers': {
        read: true,
        write: true
      },
      'TestResourceServer/test': {
        scope: true
      }
    }

    const result = transformDotNotationToObject(input)
    expect(result).toEqual(output)
  })
})
