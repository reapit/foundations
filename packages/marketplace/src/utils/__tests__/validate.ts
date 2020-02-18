import {
  isEmail,
  isValidHttpsUrl,
  isValidRedirectUrls,
  whiteListLocalhostAndIsValidUrl,
  isValidHttpUrl,
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
    ].forEach(email => expect(isEmail(email)).toBeTruthy())
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
    ].forEach(email => expect(isEmail(email)).toBeFalsy())
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

describe('isValidHttpUrl', () => {
  it('valid http url test', () => {
    ;['http://www.google.com', 'http://www.googlee.com'].forEach(url => expect(isValidHttpUrl(url)).toBeTruthy())
  })

  it('invalid https url test', () => {
    ;['htt://google.com', 'http://www'].forEach(url => expect(isValidHttpUrl(url)).toBeFalsy())
  })
})

describe('isValidRedirectUrls', () => {
  it('valid redirect url test', () => {
    ;['https://www.google.com,http://localhost:8080', 'https://www.googlee.com,https://www.facebook.com'].forEach(url =>
      expect(isValidRedirectUrls(url)).toBeTruthy(),
    )
  })

  it('invalid https url test', () => {
    ;['http://google.com,htt:google.ck', 'htt://www.google.com,ftp://www.google.com'].forEach(url =>
      expect(isValidRedirectUrls(url)).toBeFalsy(),
    )
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
