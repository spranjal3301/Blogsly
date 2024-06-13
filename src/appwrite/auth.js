import { Client, Account, ID } from "appwrite";
import config from "../config/config";

class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl) // Your API Endpoint
      .setProject(config.appwriteProjectId); // Your project ID

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        //login
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
        console.log("🚀 ~ AuthService ~ createAccount ~ error:", error)
        throw error;
    }
  }

  async login({ email, password }) {
    try {
        return await this.account.createEmailPasswordSession
        (email,password);

    } catch (error) {
        console.log("🚀 ~ AuthService ~ login ~ error:", error)
        throw error;
    }
  }

  //`check login
  async getCurrentUser() {
    try {
        const response = await this.account.get();
        return response;
    } catch (error) {
        console.log("🚀 ~ AuthService ~ getCurrentUser ~ error:", error)
        throw error;
    }
  }

  async logout(){
    try {
        await this.account.deleteSessions();
    } catch (error) {
        console.log("🚀 ~ AuthService ~ logout ~ error:", error)
        throw error;
    }
  }

}

const authService = new AuthService();

export default authService;
