# Deployment

We currently deploy static assets to S3 buckets.

- [Develop environment](https://d2lci37up5xgd.cloudfront.net) is triggered by pushs to `master` branch
- [Production environment](https://d14qr33oeibn28.cloudfront.net) is triggered by tag
  pushs with `GD-` prefix, eg. pushing `GD-0.0.1` tag will trigger a build pipeline
  and deploy it's output assets to Production S3 bucket

## Read on:

- [Home](../../README.md)
- [Getting Started](./GETTING_STARTED.md)
- [Api Platform](./API_PLATFORM.md)
- [Code Style](./CODE_STYLE.md)
- [Version Control](./VERSION_CONTROL.md)
- [Definition of Done](./DEFINITION_OF_DONE.md)
