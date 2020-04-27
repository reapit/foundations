# How to use serverless-template-generator cli
## Change DIR to `scripts/serverless-template-generator`
## Run cmd `node ./cli <template_name> <app_name>`
1. `template_name` is one of `fullstack`, `lambda`, `webapp`
* For fullstack, It'll generate serverless.yml, webpack.config.js for deploy lambda function and also web-app to AWS
* For lambda, It'll generate serverless.yml, webpack.config.js for deploy lambda function to AWS
* For webapp, It'll generate serverless.yml only for deploy web-app to cloudfront
2. `app_name` is name of the app