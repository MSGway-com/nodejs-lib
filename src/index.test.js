// @ts-check
require('dotenv').config()
const {MessageWay, isMessageWayError} = require('../dist/index')

const mobile = process.env.TEST_PHONE_NUMBER
const apiKey = process.env.API_KEY

const otp = new MessageWay(apiKey, false)

test('send otp and get its status', () => {
  return otp.sendSMS({
    mobile,
    length: 4,
    templateID: 12,
    params: ['foo']
  })
  .then(result => {
    console.log(result)
    expect(typeof result).toBe('string')
    return otp.getStatus({ OTPReferenceID: result })
  })
  .then(result => {
    console.log(result)
  })
})

test('get otp status', () => {
  return otp.getStatus({ OTPReferenceID: '1628160593121007556' })
    .then(result => {
      console.log(result)
    })
})

test('verify otp', () => {
  return otp.verify({
    mobile,
    otp: '1111',
  })
    .then(result => {
      console.log(result)
    })
    .catch(error => {
      expect(isMessageWayError(error)).toBe(true)
    })
})

test('Is otp error', () => {
  expect(isMessageWayError({ code: 10321, message: 'OK' })).toBe(true)
})
