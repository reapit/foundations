# foundation-ts-definition:
This is a package containing both marketplace and platform defintion. They are fetched by a scheduled cronjob activity executed daily at 00:00AM UTC.

# Usage:
## Install:
Beacuse this is a private scoped package, Make sure you have .npmrc in your root project folder configured with proper NPM_TOKEN env variable
Install using npm `npm install --dev @reapit/foundations-ts-definitions`
Install using yarn `npm install --dev @reapit/foundations-ts-definitions`

## Import types:

Import the required type from the package named `@reapit/foundations-ts-definitions`. Eg:
```js
import {AppClientSecretModel} from '@reapit/foundations-ts-definitions'
```