# Deployment

We currently deploy static assets to S3 buckets.

- [Develop environment](https://d3ps8i1lmu75tx.cloudfront.net) is triggered by pushs to `develop` branch
- [Production environment](https://dvyjx6qs1jinm.cloudfront.net) is triggered by tag
  pushs with `AS-` prefix, eg. pushing `AS-0.0.1` tag will trigger a build pipeline
  and deploy it's output assets to Production S3 bucket

## Read on:

- [Home](../../README.md)
- [Getting Started](./GETTING_STARTED.md)
- [Api Platform](./API_PLATFORM.md)
- [Code Style](./CODE_STYLE.md)
- [Version Control](./VERSION_CONTROL.md)
- [Definition of Done](./DEFINITION_OF_DONE.md)
