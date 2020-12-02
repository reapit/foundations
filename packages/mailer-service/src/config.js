export default {
  aws: {
    key: process.env.AWS_ACCESS_KEY_ID,
    secret: process.env.AWS_SECRET_ACCESS_KEY,
    ses: {
      from: {
        default: '"ltran@reapit.com" <noreply@example.com>',
      },
      region: 'eu-west-2',
    },
  },
}
