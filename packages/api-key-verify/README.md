# Api-key-verify 

## Install

```bash
$ yarn add @reapit/api-key-verify
```

### Get the api key

```ts
import { getApiKey } from '@reapit/api-key-verify'
import { DynamoDB } from 'aws-sdk'
import { DataMapper } from '@aws/dynamodb-data-mapper'

const dynamoMapper = new DataMapper({
  client: new DynamoDB(),
})

const apiKey = getApiKey(dynamoMapper)('x-api-key-from-your-header')

console.log(apiKey) // undefined || ApiKeyModel

```

### validating apiKey

this function will return the api key or throw an exception

```ts
import { resolveApiKey } from '@reapit/api-key-verify'
import { DynamoDB } from 'aws-sdk'
import { DataMapper } from '@aws/dynamodb-data-mapper'

const dynamoMapper = new DataMapper({
  client: new DynamoDB(),
})

export const myLambda = (req, res) => {

  try {
    const apiKey = resolveApiKey(dynamoMapper)(req.headers['x-api-key'])
  } catch(e: ApiKeyExpiredException | ApiKeyNotFoundException) {
    res.statusCode(401)
    res.send(e.message) // not found || expired
  }
}

```
