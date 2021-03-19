import { Schema } from 'express-validator'

const create = {
  eventId: {
    in: ['body'],
    isString: true,
  },
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
  status: {
    in: ['body'],
    isIn: {
      options: [['outstanding', 'actioned', 'dismissed']],
      errorMessage: 'status should be one of outstanding, actioned, dismissed',
    },
  },
  eventCreatedAt: {
    in: ['body'],
    isISO8601: {
      errorMessage:
        "eventCreatedAt should be a valid ISO8601 format, e.g. '2020-01-01T21:02:12', or if using a timezone, '2020-01-01T21:02:12-09:00'",
      options: {
        strict: true,
        strictSeparator: true,
      },
    },
    toDate: true,
  },
} as Schema

const update = {
  status: {
    in: ['body'],
    isIn: {
      options: [['outstanding', 'actioned', 'dismissed']],
      errorMessage: 'status should be one of outstanding, actioned, dismissed',
    },
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
  dateFrom: {
    in: ['query'],
    isISO8601: {
      errorMessage:
        "dateFrom should be a valid ISO8601 format, e.g. '2020-01-01T21:02:12', or if using a timezone, '2020-01-01T21:02:12-09:00'",
      options: {
        strict: true,
        strictSeparator: true,
      },
    },
  },
  dateTo: {
    in: ['query'],
    isISO8601: {
      errorMessage:
        "dateTo should be a valid ISO8601 format, e.g. '2020-01-01T21:02:12', or if using a timezone, '2020-01-01T21:02:12-09:00'",
      options: {
        strict: true,
        strictSeparator: true,
      },
    },
  },
  status: {
    optional: true,
    in: ['query'],
    isIn: {
      options: [['outstanding', 'actioned', 'dismissed']],
      errorMessage: 'status should be one of outstanding, actioned, dismissed',
    },
  },
} as Schema

export { create, list, update }
