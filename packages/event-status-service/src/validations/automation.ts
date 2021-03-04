import { Schema } from 'express-validator'

const create = {
  clientCode: {
    in: ['body'],
    isString: true,
    isLength: {
      errorMessage: 'clientCode should be 3-9 characters long',
      options: {
        min: 3,
        max: 9,
      },
    },
  },
  triggerOnEventType: {
    in: ['body'],
    isString: true,
    // isIn: {
    //   options: [['']], // TODO: add eventType enum when known
    //   errorMessage: 'triggerOnEventType should be one of ...',
    // },
  },
  messageChannel: {
    in: ['body'],
    isString: true,
    isIn: {
      options: [['sms']],
      errorMessage: 'messageChannel should be one of [sms]',
    },
  },
  messageBody: {
    in: ['body'],
    isString: true, // TODO: may want to add a max length equivalent to an SMS character limit
  },
} as Schema

const update = {
  triggerOnEventType: {
    in: ['body'],
    isString: true,
    // isIn: {
    //   options: [['']], // TODO: add eventType enum when known
    //   errorMessage: 'triggerOnEventType should be one of ...',
    // },
    optional: true,
  },
  messageChannel: {
    in: ['body'],
    isString: true,
    isIn: {
      options: [['sms']],
      errorMessage: 'messageChannel should be one of [sms]',
    },
    optional: true,
  },
  messageBody: {
    in: ['body'],
    isString: true, // TODO: may want to add a max length equivalent to an SMS character limit
    optional: true,
  },
} as Schema

const list = {
  clientCode: {
    in: ['query'],
    isString: true,
    isLength: {
      errorMessage: 'clientCode should be 3-9 characters long',
      options: {
        min: 3,
        max: 9,
      },
    },
  },
} as Schema

export { create, update, list }
