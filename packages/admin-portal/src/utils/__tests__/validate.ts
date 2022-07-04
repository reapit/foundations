import {
  isEmail,
  isValidHttpsUrl,
  isValidRedirectUrls,
  whiteListLocalhostAndIsValidUrl,
  isValidHttpUrl,
  checkValidCustomScheme,
  isValidUrlWithCustomScheme,
  isValidLimitToClientIds,
  isValidTelephone,
  isValidPersonName,
} from '../validate'

describe('isEmail', () => {
  it('valid email test', () => {
    ;[
      'foo@bar.com',
      'x@x.au',
      'foo@bar.com.au',
      'foo+bar@bar.com',
      'test123+ext@gmail.com',
      'some.name.midd.leNa.me+extension@GoogleMail.com',
      '"foobar"@example.com',
      '"foo\\@bar"@example.com',
      'test@gmail.com',
      'test.1@gmail.com',
    ].forEach((email) => expect(isEmail(email)).toBeTruthy())
  })

  it('invalid email test', () => {
    ;[
      'invalidemail@',
      'invalid.com',
      'foo@bar.com.',
      'multiple..dots@stillinvalid.com',
      'test123+invalid! sub_address@gmail.com',
      'gmail...ignores...dots...@gmail.com',
      'ends.with.dot.@gmail.com',
      'multiple..dots@gmail.com',
      'wrong()[]",:;<>@@gmail.com',
      '"wrong()[]",:;<>@@gmail.com',
    ].forEach((email) => expect(isEmail(email)).toBeFalsy())
  })
})

describe('isValidHttpsUrl', () => {
  it('valid https url test', () => {
    ;['https://www.google.com', 'https://www.googlee.com'].forEach((url) => expect(isValidHttpsUrl(url)).toBeTruthy())
  })

  it('invalid https url test', () => {
    ;['https://google.com', 'htt://www.google.com'].forEach((url) => expect(isValidHttpsUrl(url)).toBeFalsy())
  })
})

describe('isValidHttpUrl', () => {
  it('valid http url test', () => {
    ;['http://www.google.com', 'http://www.googlee.com'].forEach((url) => expect(isValidHttpUrl(url)).toBeTruthy())
  })

  it('invalid https url test', () => {
    ;['htt://google.com', 'http://www'].forEach((url) => expect(isValidHttpUrl(url)).toBeFalsy())
  })
})

describe('isValidRedirectUrls', () => {
  it('valid redirect url test', () => {
    ;['https://www.google.com,http://localhost:8080', 'https://www.googlee.com,https://www.facebook.com'].forEach(
      (url) => expect(isValidRedirectUrls(url)).toBeTruthy(),
    )
  })

  it('invalid https url test', () => {
    ;['https://google.com,htt:google.ck', 'htt://www.google.com,ftp://www.google.com'].forEach((url) =>
      expect(isValidRedirectUrls(url)).toBeFalsy(),
    )
  })
})

describe('whiteListLocalhostAndIsValidUrl', () => {
  it('valid url test', () => {
    ;['https://www.google.com', 'http://localhost:8080'].forEach((url) =>
      expect(whiteListLocalhostAndIsValidUrl(url)).toBeTruthy(),
    )
  })

  it('invalid url test', () => {
    ;['invalid url test', 'htt://www.google.com'].forEach((url) =>
      expect(whiteListLocalhostAndIsValidUrl(url)).toBeFalsy(),
    )
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
    const url3 = 'https://google.com'
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

describe('isValidTelephone', () => {
  it('should return true with valid telephone', () => {
    const telephone1 = '0689912549'
    const telephone2 = '+33698912549'
    const telephone3 = '(555)-555-5555'
    expect(isValidTelephone(telephone1)).toBe(true)
    expect(isValidTelephone(telephone2)).toBe(true)
    expect(isValidTelephone(telephone3)).toBe(true)
  })
  it('should return false with invalid telephone', () => {
    const telephone1 = 'xx-yyy-xxxxx'
    const telephone2 = '(555)-X555-5555'
    expect(isValidTelephone(telephone1)).toBe(false)
    expect(isValidTelephone(telephone2)).toBe(false)
  })
})

describe('isValidPersonName', () => {
  it('should return true with valid name', () => {
    const name1 = 'Will'
    const name2 = 'Holly'
    const name3 = 'lionel messi'
    expect(isValidPersonName(name1)).toBe(true)
    expect(isValidPersonName(name2)).toBe(true)
    expect(isValidPersonName(name3)).toBe(true)
  })
  it('should return false with invalid name', () => {
    const name1 = 'levy@11'
    const name2 = '1Will'
    const name3 = 'kakarot%%$$$'
    expect(isValidPersonName(name1)).toBe(false)
    expect(isValidPersonName(name2)).toBe(false)
    expect(isValidPersonName(name3)).toBe(false)
  })
})
