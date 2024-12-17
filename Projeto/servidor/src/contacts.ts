import * as path from "path";
const Datastore = require("nedb"); 

export interface IContact {
  _id?: number,
  name: string,
  email: string,
  owner: string
}

export class Worker {
  private db: Nedb; 
  constructor() {
    this.db = new Datastore({
      filename: path.join(__dirname, "contacts.db"),
      autoload: true,
    });
  }

  //funcao que retorna a lista de contactos que correspondem ao owner
  public listContacts(owner: string): Promise<IContact[]> {
    return new Promise((inResolve, inReject) => {
      this.db.find({"owner": owner}, (inError: Error | null, inDocs: IContact[]) => {
        if (inError) {
          inReject(inError); 
        } else {
          inResolve(inDocs); 
        }
      });
    });
  }

  public addContact(inContact: IContact): Promise<IContact> {
    return new Promise((inResolve, inReject) => {
      this.db.insert(inContact, (inError: Error | null, inNewDoc: IContact) => {
        if (inError) {
          inReject(inError); 
        } else {
          inResolve(inNewDoc); 
        }
      });
    });
  }

  public deleteContact(inID: string): Promise<void> {
    return new Promise((inResolve, inReject) => {
      this.db.remove(
        { _id: inID },
        {},
        (inError: Error | null, inNumRemoved: number) => {
          if (inError) {
            inReject(inError); 
          } else {
            inResolve(); 
          }
        }
      );
    });
  }
}
