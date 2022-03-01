import { uppercaseSentence } from '../utils'

describe('uppercaseSentence', () => {
  it('should work as expected', () => {
    expect(uppercaseSentence('hello world')).toEqual('Hello World')
    expect(uppercaseSentence('helloWorld')).toEqual('Hello World')
  })
})
