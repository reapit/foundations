import sleep from './sleep'

describe('sleep', () => {
  it('should be promise', () => {
    expect(typeof sleep().then).toEqual('function')
  })

  it('should wait', () => {
    const track: string[] = []
    sleep(10).then(() => {
      track.push('b')
      expect(track).toEqual(['a', 'b'])
    })
    track.push('a')
  })
})
