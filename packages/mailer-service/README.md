# Mailer Service

Microservice to send template emails using AWS SES

![lines](./src/tests/badges/badge-lines.svg) ![functions](./src/tests/badges/badge-functions.svg) ![branches](./src/tests/badges/badge-branches.svg) ![statements](./src/tests/badges/badge-statements.svg)

POST /payments/request/:paymentId

- Headers

```
Authorization: <<ConnectIdToken>>
reapit-customer: SBOX
x-api-key: 86fe34a8-604d-4fed-825d-6888f43f3b2f
api-version: 2020-01-31
```

- Body

```json
{
	"receipientEmail": "email@example.com", 
  "recipientName": "SOME_NAME",
  "paymentReason": "SOME_REASON",
  "paymentCurrency": "GBP",
  "paymentAmount": 10000,
	"paymentExpiry": "2021-01-06T19:00:12.357Z"
}
```

- Response 200

