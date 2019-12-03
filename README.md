# Cognitio Auth

Simple Lambda around AWS Cognito for basic authentication flow

## Getting started

- First create a `env.yml` file at the root of the project. You will see the keys you will need in the `env.example.yml` file - you should obtain the values from the AWS Console.
- Assuming you have NodeJS@10.x installed, run `npm install -g serverless yarn`
- Run `yarn` to install dependant node modules.
- Add your personal AWS IAM credentials to your $PATH using `serverless config credentials --provider aws --key <<KEY>> --secret <<SECRET_KEY>>`, full docs [here](https://github.com/serverless/serverless/blob/master/docs/providers/aws/guide/credentials.md)
- You are now good to start developing. To run a local server in watch mode, run `yarn dev`.
- To run tests in watch mode run `yarn test-dev`.
- To deploy the app to AWS, just run `yarn deploy`. This will run the following steps;
  - `yarn lint` To check for code and formatting errors.
  - `yarn build` To compile the TypeScript to JavaScript.
  - `yarn test` To run the tests, both unit and integration.
  - `yarn serverless` To bundle the app and push to AWS Lambda - **this will deploy to production immediately so proceed carefully!**.
- To view details of your deployment, configure the Lambda or view the logs [visit](https://eu-west-2.console.aws.amazon.com/lambda/home?region=eu-west-2#/functions/cognito-auth-api-dev-dev-server?tab=graph).

## API

- The service deploys five endpoints;
  - POST `https://rbsbshnxvb.execute-api.eu-west-2.amazonaws.com/dev/api/login`
    - Logs the user in and returns 3 tokens; access, refresh and id. Id and access tokens expire each hour and so an expiry time for each is returned. When near expiry, developer should refresh the session with the refreshToken to the endpoint below.
    - Request example;
    ```JSON
      {
          "password": "SOME_PASSWORD",
          "userName": "SOME_EMAIL"
      }

    ```
    - Response example;
    ```JSON
      {
          "accessToken": "SOME_TOKEN",
          "accessTokenExpiry": 1563462727,
          "idToken": "SOME_TOKEN",
          "idTokenExpiry": 1563462727,
          "refreshToken": "SOME_TOKEN"
      }
    ```
  - POST `https://rbsbshnxvb.execute-api.eu-west-2.amazonaws.com/dev/api/refresh`
    - Refreshes the session when near expiry and returns a new session by using passing the refreshToken and userName to Cognito.
    - Request example;
    ```JSON
      {
          "refreshToken": "SOME_TOKEN",
          "userName": "SOME_EMAIL"
      }
    ```
    - Response example;
    ```JSON
      {
          "accessToken": "SOME_TOKEN",
          "accessTokenExpiry": 1563462727,
          "idToken": "SOME_TOKEN",
          "idTokenExpiry": 1563462727,
          "refreshToken": "SOME_TOKEN"
      }
    ```

  - POST `https://rbsbshnxvb.execute-api.eu-west-2.amazonaws.com/dev/api/password/change`
    - Updates user password
    - Request example;
    ```JSON
      { 
        "password": "Password1234",
        "newPassword": "Password123",
        "userName": "willmcvay@pm.me"
      }

    ```
    - Response example;
    ```JSON
      {
        "message": "SUCCESS"
      }
    ```
  
  - POST `https://rbsbshnxvb.execute-api.eu-west-2.amazonaws.com/dev/api/password/reset`
    - Initialises forgot password flow and sends email with verificationCode code to user.
    - Request example;
    ```JSON
      { 
        "userName": "willmcvay@pm.me"
      }

    ```
    - Response example;
    ```JSON
      {
        "CodeDeliveryDetails": {
          "AttributeName": "email",
          "DeliveryMedium": "EMAIL",
          "Destination": "w***@p***.me"
        }
      }
    ```

  - POST `https://rbsbshnxvb.execute-api.eu-west-2.amazonaws.com/dev/api/password/confirm`
    - Takes verificationCode from previous step and resets password for user
    - Request example;
    ```JSON
      {
        "newPassword": "Password1234",
        "userName": "willmcvay@pm.me",
        "verificationCode": "123849"
      }

    ```
    - Response example;
    ```JSON
      {
        "message": "SUCCESS"
      }
    ```

  - POST `https://rbsbshnxvb.execute-api.eu-west-2.amazonaws.com/dev/api/registration/confirm`
    - Takes verificationCode from registration flow and confirms account with Cognito
    - Request example;
    ```JSON
      {
        "userName": "willmcvay@pm.me",
        "verificationCode": "123849"
      }

    ```
    - Response example;
    ```JSON
      {
        "message": "SUCCESS"
      }
    ```
## Emails

The service also deploys a lambda that intercepts email events from AWS Lambda and returns custom emails. This service is a single function in the `src/mailer` folder. It appends html (ejs), templates served from the `src/mailer/ejs` folder. 

To develop on these templates, just run `yarn dev` as normal and navigate to `localhost:3000/emails` - nodemon will hot reload as you make changes. This route is only available in development mode.