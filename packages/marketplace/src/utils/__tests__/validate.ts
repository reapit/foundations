import { isEmail } from '../validate'

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
