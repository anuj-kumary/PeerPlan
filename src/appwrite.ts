// src/appwrite.js
import { Client, Account, OAuthProvider } from 'appwrite'

const client = new Client()
client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('66f3d0d5003b5454063a')
  export const account = new Account(client)
export { OAuthProvider }

