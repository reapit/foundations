import {
  isImageType,
  isValidUrlWithCustomScheme,
  isValidLimitToClientIds,
  checkValidCustomScheme,
  isValidHttpsUrl,
  isValidHttpUrl,
  whiteListLocalhostAndIsValidUrl,
} from '../string'

describe('isImageType', () => {
  it('should return true', () => {
    const input = 'image/jpeg'
    const output = true
    const result = isImageType(input)
    expect(result).toEqual(output)
  })
})

describe('checkValidCustomScheme', () => {
  it('should return true with valid custom scheme', () => {
    const url1 = 'myapp://link.com'
    const url2 = 'myapp://link2'
    expect(checkValidCustomScheme(url1)).toBe(true)
    expect(checkValidCustomScheme(url2)).toBe(true)
  })
  it('should return true with localhost', () => {
    const url1 = 'http://localhost'
    const url2 = 'http://localhost:8080'
    expect(checkValidCustomScheme(url1)).toBe(true)
    expect(checkValidCustomScheme(url2)).toBe(true)
  })
  it('should return false with invalid url', () => {
    const url1 = 'app:invalid'
    const url2 = ''
    const url3 = 'http://google.com'
    const url4 = 'myapp:/link.com'
    expect(checkValidCustomScheme(url1)).toBe(false)
    expect(checkValidCustomScheme(url2)).toBe(false)
    expect(checkValidCustomScheme(url3)).toBe(false)
    expect(checkValidCustomScheme(url4)).toBe(false)
  })
})

describe('isValidUrlWithCustomScheme', () => {
  it('should return true with valid urls', () => {
    const urls1 = 'myapp://link.com, myapp://link2'
    const urls2 = 'myapp://link.com, http://localhost'
    const urls3 = 'https://link.com, http://localhost:9090'
    const urls4 = 'https://link.com,    https://localhost'
    expect(isValidUrlWithCustomScheme(urls1)).toBe(true)
    expect(isValidUrlWithCustomScheme(urls2)).toBe(true)
    expect(isValidUrlWithCustomScheme(urls3)).toBe(true)
    expect(isValidUrlWithCustomScheme(urls4)).toBe(true)
  })
  it('should return false with invalid urls', () => {
    const urls1 = 'myapp:link.com, myapp://link2'
    const urls2 = 'myapp:/link.com, http://localhost'
    const urls3 = 'http://link.com, http://localhost:9090'
    const urls4 = 'link-com,    https://localhost'
    const urls5 = 'app2://link-com, https://localhost'
    expect(isValidUrlWithCustomScheme(urls1)).toBe(false)
    expect(isValidUrlWithCustomScheme(urls2)).toBe(false)
    expect(isValidUrlWithCustomScheme(urls3)).toBe(false)
    expect(isValidUrlWithCustomScheme(urls4)).toBe(false)
    expect(isValidUrlWithCustomScheme(urls5)).toBe(false)
  })
})

describe('isValidLimitToClientIds', () => {
  it('should return true with valid clientIds', () => {
    const clientIds1 = 'abc'
    const clientIds2 = 'abc,123,moz'
    const clientIds3 = 'abc,123,ie9'
    expect(isValidLimitToClientIds(clientIds1)).toBe(true)
    expect(isValidLimitToClientIds(clientIds2)).toBe(true)
    expect(isValidLimitToClientIds(clientIds3)).toBe(true)
  })
  it('should return false with invalid clientIds', () => {
    const clientIds1 = 'abc,'
    const clientIds2 = 'abc1'
    const clientIds3 = 'abc,123z,ie9'
    expect(isValidLimitToClientIds(clientIds1)).toBe(false)
    expect(isValidLimitToClientIds(clientIds2)).toBe(false)
    expect(isValidLimitToClientIds(clientIds3)).toBe(false)
  })
})

describe('isValidHttpsUrl', () => {
  it('valid https url test', () => {
    ;['https://www.google.com', 'https://www.googlee.com'].forEach(url => expect(isValidHttpsUrl(url)).toBeTruthy())
  })

  it('invalid https url test', () => {
    ;['http://google.com', 'htt://www.google.com'].forEach(url => expect(isValidHttpsUrl(url)).toBeFalsy())
  })
})

describe('whiteListLocalhostAndIsValidUrl', () => {
  it('valid url test', () => {
    ;['https://www.google.com', 'http://localhost:8080'].forEach(url =>
      expect(whiteListLocalhostAndIsValidUrl(url)).toBeTruthy(),
    )
  })

  it('invalid url test', () => {
    ;['invalid url test', 'htt://www.google.com'].forEach(url =>
      expect(whiteListLocalhostAndIsValidUrl(url)).toBeFalsy(),
    )
  })
})

describe('isValidHttpUrl', () => {
  it('valid http url test', () => {
    ;['http://www.google.com', 'http://www.googlee.com'].forEach(url => expect(isValidHttpUrl(url)).toBeTruthy())
  })

  it('invalid https url test', () => {
    ;['htt://google.com', 'http://www'].forEach(url => expect(isValidHttpUrl(url)).toBeFalsy())
  })
})
