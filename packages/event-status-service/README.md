# Events Service

This is a microservice to store and manage event automations and event statuses. It has two other major functions:

1. Provides an endpoint that acts as a webhook for the Events API - this sets up a default event status and can also trigger any automations that might been set up.
1. Provides an endpoint for clients to pull a list of events that are decorated with any automation conversations, and also with suggested actions.

![Simple architecture diagram showing the logic and different services involved](architectureDiagram-3Mar21.jpeg)

Data is persisted in DynamoDB. All API routes are protected by Reapit Cognito authentication, and must be accessed with a Cognito ID Token in the `Authorization` header

![lines](./src/tests/badges/badge-lines.svg) ![functions](./src/tests/badges/badge-functions.svg) ![branches](./src/tests/badges/badge-branches.svg) ![statements](./src/tests/badges/badge-statements.svg)

#### Create an event status

POST /event-status

- Body

```json
{
  "eventId": "c23b0f02-0bc1-43ee-8b8f-2e88827a551a",
  "clientCode": "SBOX",
  "status": "outstanding",
  "eventCreatedAt": "2021-01-06T19:00:12.357Z"
}
```

- Response 200

```json
{
  "eventId": "c23b0f02-0bc1-43ee-8b8f-2e88827a551a",
  "clientCode": "SBOX",
  "status": "outstanding",
  "eventCreatedAt": "2021-01-06T19:00:12.357Z",
  "statusCreatedAt": "2021-01-06T19:06:00.000Z",
  "statusUpdatedAt": "2021-01-06T19:06:00.000Z"
}
```

#### Get an event status, by the ID of the event

GET /event-status/:eventId

- Response 200

```json
{
  "eventId": "c23b0f02-0bc1-43ee-8b8f-2e88827a551a",
  "clientCode": "SBOX",
  "status": "outstanding",
  "eventCreatedAt": "2021-01-06T19:00:12.357Z",
  "statusCreatedAt": "2021-01-06T19:06:00.000Z",
  "statusUpdatedAt": "2021-01-06T19:06:00.000Z"
}
```

#### Update an event status, by the ID of the event

PUT /event-status/:eventId

- Body

```json
{
  "status": "actioned"
}
```

- Response 200

```json
{
  "eventId": "c23b0f02-0bc1-43ee-8b8f-2e88827a551a",
  "clientCode": "SBOX",
  "status": "actioned",
  "eventCreatedAt": "2021-01-06T19:00:12.357Z",
  "statusCreatedAt": "2021-01-06T19:06:00.000Z",
  "statusUpdatedAt": "2021-01-06T19:06:00.000Z"
}
```

#### List event statuses

GET /event-status

- Query parameters

  - `clientCode`
  - `dateFrom` (searches on the eventCreatedAt field)
  - `dateTo` (searches on the eventCreatedAt field)
  - `status` (optional)

* Response 200

```json
[
  {
    "eventId": "c23b0f02-0bc1-43ee-8b8f-2e88827a551a",
    "clientCode": "SBOX",
    "status": "actioned",
    "eventCreatedAt": "2021-01-06T19:00:12.357Z",
    "statusCreatedAt": "2021-01-06T19:06:00.000Z",
    "statusUpdatedAt": "2021-01-06T19:06:00.000Z"
  },
  {
    "eventId": "c23b0f02-0bc1-43ee-8b8f-2e88827a551b",
    "clientCode": "SBOX",
    "status": "dismissed",
    "eventCreatedAt": "2021-02-06T19:00:12.357Z",
    "statusCreatedAt": "2021-02-06T19:06:00.000Z",
    "statusUpdatedAt": "2021-02-06T19:06:00.000Z"
  }
]
```
