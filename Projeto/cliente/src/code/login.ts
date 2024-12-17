// Library imports.
import axios, { AxiosResponse } from "axios";

// App imports.
import { config } from "./config";

// Define interface to describe a Login. 
export interface ILogin { pass: string, email: string }

// The worker that will perform the login.
export class Worker {

  /**
   * Send login details to the server.
   *
   * @oaram  email     user email.
   * @oaram  pass      user pass.
   * @return           user details
   */
  public async doLogin(email: string, pass: string): Promise<ILogin> {

    console.log("Contacts.Worker.addContact()", {userpass: pass, useremail: email});

    const response: AxiosResponse = await axios.post(`${config.serverAddress}/doLogin`, {userpass: pass, useremail: email});
    return response.data;

  } /* End doLogin(). */



} /* End class. */
