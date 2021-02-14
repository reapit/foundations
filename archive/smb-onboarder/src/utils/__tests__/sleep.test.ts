import sleep from '../sleep'

describe('sleep', () => {
  it('should be promise', () => {
    expect(typeof sleep().then).toEqual('function')
  })

  it('should wait', done => {
    const track: string[] = []
    sleep(10).then(() => {
      track.push('b')
      expect(track).toEqual(['a', 'b'])
      done()
    })
    track.push('a')
  })
})
