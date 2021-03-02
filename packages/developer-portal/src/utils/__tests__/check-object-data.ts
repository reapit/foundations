import { checkAllKeysHasValueNotEmpty, checkAtLeastOneKeyHasValueIsNotEmpty } from '../check-object-data'

describe('checkAtLeastOneKeyHasValueIsNotEmpty', () => {
  const testCases = [
    [0, true],
    [undefined, true],
  ]

  type Input = {
    key: any
    key2: boolean
  }

  testCases.forEach((testCase) => {
    const input = { key: testCase[0], key2: true }
    const output = testCase[1]

    test(JSON.stringify(input), () => {
      expect(
        checkAtLeastOneKeyHasValueIsNotEmpty<Input>({
          object: input,
          keys: ['key', 'key2'],
        }),
      ).toBe(output)
    })
  })

  describe('All fields are empty', () => {
    const input = { key: false, key2: false }
    const output = false

    test(JSON.stringify(input), () => {
      expect(
        checkAtLeastOneKeyHasValueIsNotEmpty<Input>({
          object: input,
          keys: ['key', 'key2'],
        }),
      ).toBe(output)
    })
  })

  test('object is null', () => {
    expect(
      checkAtLeastOneKeyHasValueIsNotEmpty<null>({ object: null, keys: [] }),
    ).toBe(false)
  })
})

describe('checkAllKeysHasValueNotEmpty', () => {
  const testCases = [
    ['something', true],
    [0, true],
    [undefined, false],
    [null, false],
  ]

  type Input = {
    key: any
    key2: boolean
  }

  testCases.forEach((testCase) => {
    const input = { key: testCase[0], key2: true }
    const output = testCase[1]

    test(JSON.stringify(input), () => {
      expect(
        checkAllKeysHasValueNotEmpty<Input>({
          object: input,
          keys: ['key', 'key2'],
        }),
      ).toBe(output)
    })
  })

  test('object is null', () => {
    expect(
      checkAllKeysHasValueNotEmpty<null>({ object: null, keys: [] }),
    ).toBe(false)
  })
})
