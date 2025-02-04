// src/appwrite.js
import { Client, Account, OAuthProvider,Storage, } from 'appwrite'

const client = new Client()
const storage = new Storage(client);
client
  .setEndpoint(import.meta.env.VITE_APP_ENDPOINT)
  .setProject(import.meta.env.VITE_APP_PROJECT_ID)
  export const account = new Account(client)
export { OAuthProvider,storage }

