import { checkObjectKeysValueIsNotEmpty, checkAtLeastOneKeysOfObjectIsNotEmpty } from '../check-object-fields'

describe('checkAtLeastOneKeysOfObjectIsNotEmpty', () => {
  const testCases = [
    [0, true],
    [undefined, true],
  ]

  type Input = {
    key: any
    key2: boolean
  }

  testCases.forEach(testCase => {
    const input = { key: testCase[0], key2: true }
    const output = testCase[1]

    test(JSON.stringify(input), () => {
      expect(
        checkAtLeastOneKeysOfObjectIsNotEmpty<Input>({
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
        checkAtLeastOneKeysOfObjectIsNotEmpty<Input>({
          object: input,
          keys: ['key', 'key2'],
        }),
      ).toBe(output)
    })
  })

  test('object is null', () => {
    expect(
      checkAtLeastOneKeysOfObjectIsNotEmpty<null>({ object: null, keys: [] }),
    ).toBe(false)
  })
})

describe('checkObjectKeysValueIsNotEmpty', () => {
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

  testCases.forEach(testCase => {
    const input = { key: testCase[0], key2: true }
    const output = testCase[1]

    test(JSON.stringify(input), () => {
      expect(
        checkObjectKeysValueIsNotEmpty<Input>({
          object: input,
          keys: ['key', 'key2'],
        }),
      ).toBe(output)
    })
  })

  test('object is null', () => {
    expect(
      checkObjectKeysValueIsNotEmpty<null>({ object: null, keys: [] }),
    ).toBe(false)
  })
})
