import OpenAI from "openai"
import config from '../config.json'
import { Handler, APIGatewayEvent, Context } from 'aws-lambda'
import snowflake from 'snowflake-sdk'
// import schema from './schema.js'

const openai = new OpenAI({
  apiKey: config.apiKey,
})


let snowflakeConnection: snowflake.Connection | undefined = undefined

const resolveSnowFlakeConnection = async (): Promise<snowflake.Connection> => {
  if (snowflakeConnection !== undefined) return snowflakeConnection

  const connection = snowflake.createConnection({
    account: 'AF38701.eu-west-2',
    username: 'ashleigh',
    password: config.SNOWFLAKE_PASSWORD,
    application: 'AI-BI',
    clientSessionKeepAlive: true,
  })

  snowflakeConnection = await new Promise<any>((resolve, reject) => connection.connect((error, connection) => {
    if (error) {
      console.error(error)
      reject(error)
    }
    console.log('connection successful', connection)
    resolve(connection)
  }))

  return snowflakeConnection as snowflake.Connection
}

const propertySchema = `
TABLE REAPIT.ANALYTICS_RES.Property_sales_completions
name,type,kind,null?,default,primary key,unique key,check,expression,comment,policy name
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

const corsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'POST,OPTIONS',
}

export const handler: Handler = async  (event: APIGatewayEvent) => {

  if (event.httpMethod === 'options') {
    return {
      statusCode: 200,
      headers: {
        ...corsHeaders,
      }
    }
  }

  const request = JSON.parse(event.body || '{}')

  if (!request.text) {
    return {
      statusCode: 400,
      body: 'Text is a required property',
      headers: {
        ...corsHeaders,
      }
    }
  }

  const result = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are an SQL query generation assistant. You will be given a business anaylsis based question and will be required to return just an SQL query to be ran against the provided schema without explanation."
      },
      { role: 'system', content: propertySchema },
      { role: 'user', content: request.text },
    ],
    model: 'gpt-3.5-turbo',
    max_tokens: 150,
    temperature: 0,
    stop: ['#', ';'],
    top_p: 1,
  })

  console.log('result', result.choices[0].message.content)

  const snowflake = await resolveSnowFlakeConnection()

  let responseResults: any[] = []

  const snowflakeResult = await snowflake.execute({
    sqlText: result.choices[0].message.content as string,
    streamResult: true,
    complete: (err) => {
      if (err) {
        console.error(err)
        throw err
      }

      return responseResults
    },
  })

  let data: any [] = []

  const response = await new Promise((resolve, reject) => snowflakeResult
    .streamRows()
    .on('readable', function(row) {
      // @ts-ignore
      while ((row = this.read()) != null) {
        data.push(row)
      }
    }).on('end', () => resolve(data))
    .on('error', (error) => reject(error))
  )

  console.log('orws', response)

  // await new Promise<void>((resolve, reject) => snowflakeConnection?.destroy((error) => {
  //   if (error) reject(error)
  //   snowflakeConnection = undefined
  //   resolve()
  // }))

  return {
    statusCode: 200,
    headers: {'Content-Type': 'application/json', ...corsHeaders },
    body: JSON.stringify(response),
  }
}

handler({
  body: JSON.stringify({
    text: "Show me the average sale price for this year",
  }),
  httpMethod: 'POST',
}, {} as Context, () => {})
