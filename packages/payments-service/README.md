# Payments Service

Microservice proxy to platform Payments API, to allow authenticated simple sessions for non-Reapit Connect users

![lines](./src/tests/badges/badge-lines.svg) ![functions](./src/tests/badges/badge-functions.svg) ![branches](./src/tests/badges/badge-branches.svg) ![statements](./src/tests/badges/badge-statements.svg)

POST /api-key

- Body

```json
{
	"clientCode": "SBOX", 
	"paymentId": "MKT20000010",
	"keyExpiresAt": "2021-01-06T19:00:12.357Z"
}
```

- Response 200

```json
{
  "apiKey": "86fe34a8-604d-4fed-825d-6888f43f3b2f"
}
```

GET /payments/:paymentId

- Headers

```
reapit-customer: SBOX
x-api-key: 86fe34a8-604d-4fed-825d-6888f43f3b2f
api-version: 2020-01-31
```

- Response 200

```json
{
  "payment": {
    "id": "MKT20000010",
    "created": "2020-11-13T12:17:38.0000000Z",
    "modified": "2021-01-06T09:26:25.0000000Z",
    "type": "paymentRequest",
    "description": "Tenant Receipt - Payment Request: Pete Fee request",
    "status": "posted",
    "ledger": "tenant",
    "amount": 50,
    "clientAccountName": "Lettings Client Acc",
    "externalReference": "SOME_POSTED_REF",
    "companyId": null,
    "customer": {
      "id": "RPT17000005",
      "name": "Mr Max Atkinson",
      "title": "Mr",
      "forename": "Max",
      "surname": "Atkinson",
      "type": "contact",
      "homePhone": null,
      "workPhone": null,
      "mobilePhone": "077865932145",
      "email": "max@atkinson.co.uk",
      "primaryAddress": {
        "buildingName": "Flat 5",
        "buildingNumber": "17",
        "line1": "Hans Crescent",
        "line2": "Knightbridge",
        "line3": "London",
        "line4": "",
        "postcode": "SW1X 0LG",
        "countryId": "GB"
      }
    },
    "landlordId": null,
    "propertyId": "RPT200032",
    "tenancyId": null,
    "_eTag": "\"12DCB538D33214CD8FA665629DE6E016\"",
    "_links": {
      "self": {
        "href": "/payments/MKT20000010"
      },
      "customer": {
        "href": "/contacts/RPT17000005"
      },
      "property": {
        "href": "/properties/RPT200032"
      }
    },
    "_embedded": null
  }
}
```
PATCH /payments/:paymentId

- Headers

```
reapit-customer: SBOX
x-api-key: 86fe34a8-604d-4fed-825d-6888f43f3b2f
api-version: 2020-01-31
if-match: "12DCB538D33214CD8FA665629DE6E016"
```

- Response 204

```
No content
```