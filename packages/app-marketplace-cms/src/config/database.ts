import { registerAs } from "@nestjs/config";

export default registerAs('database', () => ({
  region: process.env.DYNAMODB_REGION,
}))
