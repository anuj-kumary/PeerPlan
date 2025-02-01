import { Client, Databases, Query, Users } from "node-appwrite";
const endpoint = import.meta.env.VITE_APP_ENDPOINT;

if (!endpoint) {
  throw new Error('VITE_APP_ENDPOINT is not defined');
}
class AppwriteService {
  databases: Databases;
  users: Users;
  constructor() {
    const client = new Client();
    client
      .setEndpoint(import.meta.env.VITE_APP_ENDPOINT)
      .setProject(import.meta.env.VITE_APP_PROJECT_ID)
      .setKey(import.meta.env.VITE_APP_API_KEY);

    this.databases = new Databases(client);
    this.users = new Users(client);
  }

  async getUsersList() {
    try {
      const document = await this.users.list([Query.limit(1)]);
      console.log(document,"document")
      return document;
    } catch (error) {
      console.log(error,"error")
      return 0;
    }
  }
}

export const appwriteService = new AppwriteService();
