// @ts-check
require('dotenv').config()
const {MessageWay, isMessageWayError} = require('../dist/index')

const mobile = process.env.TEST_PHONE_NUMBER
const apiKey = process.env.API_KEY

const message = new MessageWay(apiKey, false)

test('send message and get its status', () => {
  return message.sendSMS({
    mobile,
    length: 4,
    templateID: 12,
    params: ['foo']
  })
  .then(result => {
    console.log(result)
    expect(typeof result).toBe('string')
    return message.getStatus({ OTPReferenceID: result })
  })
  .then(result => {
    console.log(result)
  })
})

test('get message status', () => {
  return message.getStatus({ OTPReferenceID: '1628160593121007556' })
    .then(result => {
      console.log(result)
    })
})

test('verify otp', () => {
  return message.verify({
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

test('Is message way error', () => {
  expect(isMessageWayError({ code: 10321, message: 'OK' })).toBe(true)
})
