import * as path from "path";
const Datastore = require("nedb");

export interface IUser {
  email: string;
  password: string;
}

export class UserWorker {
  private db: Nedb;

  constructor() {
    this.db = new Datastore({
      filename: path.join(__dirname, "users.db"),
      autoload: true,
    });
  }

  /**
   * Register a new user.
   * @param user The user to register.
   */
  public registerUser(user: IUser): Promise<IUser> {
    return new Promise((resolve, reject) => {
      this.db.insert(user, (err: Error | null, newDoc: IUser) => {
        if (err) {
          reject(err);
        } else {
          resolve(newDoc);
        }
      });
    });
  }

  /**
   * Validate user credentials.
   * @param email User email.
   * @param password User password.
   */
  public validateUser(email: string, password: string): Promise<IUser | null> {
    return new Promise((resolve, reject) => {
      this.db.findOne({ email, password }, (err: Error | null, doc: IUser) => {
        if (err) {
          reject(err);
        } else {
          resolve(doc);
        }
      });
    });
  }
}
