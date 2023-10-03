import OpenAI from "openai"
import config from '../config.json'
import { Handler, APIGatewayEvent } from 'aws-lambda'

const openai = new OpenAI({
  apiKey: config.apiKey,
})

const propertySchema = `name,type,kind,null?,default,primary key,unique key,check,expression,comment,policy name
ID,VARCHAR(32),COLUMN,Y,,N,N,,,,
PROPERTY_ID,VARCHAR(32),COLUMN,Y,,N,N,,,,
PROPERTY_CODE,VARCHAR(9),COLUMN,Y,,N,N,,,,
OFFER_ID,VARCHAR(32),COLUMN,Y,,N,N,,,,
OFFICE_ID,VARCHAR(32),COLUMN,Y,,N,N,,,,
NEGOTIATOR_ID,VARCHAR(32),COLUMN,Y,,N,N,,,,
COMPLETION_DATE,DATE,COLUMN,Y,,N,N,,,,
EXCHANGED_PRICE,"NUMBER(38,0)",COLUMN,Y,,N,N,,,,
PERCENT_OF_ASKING_PRICE,"NUMBER(38,1)",COLUMN,Y,,N,N,,,,
DAYS_SINCE_VALUATION,"NUMBER(9,0)",COLUMN,Y,,N,N,,,,
DAYS_SINCE_INSTRUCTION,"NUMBER(9,0)",COLUMN,Y,,N,N,,,,
DAYS_SINCE_ACCEPTED_OFFER,"NUMBER(9,0)",COLUMN,Y,,N,N,,,,
DAYS_SINCE_EXCHANGE,"NUMBER(9,0)",COLUMN,Y,,N,N,,,,
_CUSTOMER_ID,VARCHAR(16777216),COLUMN,Y,,N,N,,,,
_LAST_SYNCH_AT,TIMESTAMP_TZ(9),COLUMN,Y,,N,N,,,,
`

export const handler: Handler = async  (event: APIGatewayEvent) => {

  const request = JSON.parse(event.body || '{}')

  const result = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: propertySchema },
      { role: 'user', content: request.text },
    ],
    model: 'gpt-3.5-turbo',
  })

  console.log('result', result)

  return result
}
