import { Connection, createConnection, getConnection } from 'typeorm'
import { dbConfig } from './../config/db'

let connection: Connection | null = null

export const connect = async (): Promise<Connection | never> => {
  if (connection !== null) return Promise.resolve(connection)

  try {
    connection = await getConnection()
  } catch {
    connection = await createConnection(dbConfig)
  }

  return connection
}

export const closeDb = async () => {
  const connection = await connect()

  await connection.close()
}
