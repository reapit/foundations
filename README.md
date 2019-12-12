# web-components

# Deployment
### CDN:
**Prerequisites**: [Install](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html) and [configure](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html) `aws-cli`

Install dependencies:

```sh
yarn install
```

Build and deploy to S3 bucket:

```sh
yarn build && make s3
```