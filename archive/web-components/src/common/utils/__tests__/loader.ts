import { loader } from '../loader'

describe('loader utils', () => {
  it('should return correctly', () => {
    document.body.innerHTML = '<html></html>'
    const url = '//maps.googleapis.com/maps/api/js?key=API_KEY&libraries=places&callback=onMapReady'
    const callback = jest.fn()
    loader(url, callback)
    const tags = document.getElementsByTagName('script')
    expect(tags.length).toBe(1)
    expect(tags[0].hasAttribute('src')).toEqual(true)
    expect(tags[0].src).toEqual(
      'http://maps.googleapis.com/maps/api/js?key=API_KEY&libraries=places&callback=onMapReady',
    )
  })
})
