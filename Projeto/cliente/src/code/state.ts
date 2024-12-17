// App imports.
import * as Contacts from "./Contacts";
import { config } from "./config";
// import * as IMAP from "./IMAP";
import * as SMTP from "./SMTP";
import * as Logins from "./login"


export function createState(inParentComponent: any) {
  return {
    // Flag: Is the please wait dialog visible?
    pleaseWaitVisible: false,

    // List of contacts.
    contacts: [],

    // List of mailboxes.
    // mailboxes : [ ],

    // List of messages in the current mailbox.
    // messages : [ ],

    // The view that is currently showing ("welcome", "message", "compose", "contact" or "contactAdd").
    currentView: "welcome",

    // The currently selected mailbox, if any.
    currentMailbox: null,

    // The details of the message currently being viewed or composed, if any.
    messageID: null,
    messageDate: null,
    messageFrom: null,
    messageTo: null,
    messageSubject: null,
    messageBody: null,

    // The details of the contact currently being viewed or added, if any.
    contactID: null,
    contactName: null,
    contactEmail: null,

    // the details of the current user logged in
    userEmail: null,
    userPass: null,
   
    showHidePleaseWait: function (inVisible: boolean): void {
      this.setState({ pleaseWaitVisible: inVisible });
    }.bind(inParentComponent) /* End showHidePleaseWait(). */,

   
    showContact: function (
      inID: string,
      inName: string,
      inEmail: string
    ): void {
      console.log("state.showContact()", inID, inName, inEmail);

      this.setState({
        currentView: "contact",
        contactID: inID,
        contactName: inName,
        contactEmail: inEmail,
      });
    }.bind(inParentComponent) /* End showContact(). */,

    /**
     * Show ContactView in add mode.
     */
    showAddContact: function (): void {
      console.log("state.showAddContact()");

      this.setState({
        currentView: "contactAdd",
        contactID: null,
        contactName: "",
        contactEmail: "",
      });
    }.bind(inParentComponent) /* End showAddContact(). */,

    showComposeMessage: function (inType: string): void {
      console.log("state.showComposeMessage()");

      switch (inType) {
        case "new":
          this.setState({
            currentView: "compose",
            messageTo: "",
            messageSubject: "",
            messageBody: "",
            messageFrom: this.userEmail,
          });
          break;

        case "reply":
          this.setState({
            currentView: "compose",
            messageTo: this.state.messageFrom,
            messageSubject: `Re: ${this.state.messageSubject}`,
            messageBody: `\n\n---- Original Message ----\n\n${this.state.messageBody}`,
            messageFrom: this.userEmail,
          });
          break;

        case "contact":
          this.setState({
            currentView: "compose",
            messageTo: this.state.contactEmail,
            messageSubject: "",
            messageBody: "",
            messageFrom: this.userEmail,
          });
          break;
      }
    }.bind(inParentComponent) /* End showComposeMessage(). */,

    getContacts: async function(): Promise<Contacts.IContact[]> {
      const contactsWorker: Contacts.Worker = new Contacts.Worker();
      return await contactsWorker.listContacts(this.userEmail);
  
  }.bind(inParentComponent) /* End showComposeMessage(). */,

   
    addContactToList: function (inContact: Contacts.IContact): void {
      console.log("state.addContactToList()", inContact);

      // Copy list.
      const cl = this.state.contacts.slice(0);

      // Add new element.
      cl.push({
        _id: inContact._id,
        name: inContact.name,
        email: inContact.email,
      });

      // Update list in state.
      this.setState({ contacts: cl });
    }.bind(inParentComponent) /* End addContactToList(). */,


    setContactList: function (contacts: Contacts.IContact[]): void {
      this.setState( { contacts });
    }.bind(inParentComponent) ,

    fieldChangeHandler: function (inEvent: any): void {
      console.log(
        "state.fieldChangeHandler()",
        inEvent.target.id,
        inEvent.target.value
      );

      // Enforce max length for contact name.
      if (
        inEvent.target.id === "contactName" &&
        inEvent.target.value.length > 50
      ) {
        return;
      }

      this.setState({ [inEvent.target.id]: inEvent.target.value });
    }.bind(inParentComponent) /* End fieldChangeHandler(). */,

    /**
     * Save contact.
     */
    saveContact: async function (): Promise<void> {
      console.log(
        "state.saveContact()",
        this.state.contactID,
        this.state.contactName,
        this.state.contactEmail,
        this.state.userEmail
      );

      // Copy list.
      console.log("copia", this.state.contacts)
      const cl = this.state.contacts.slice(0);

      // Save to server.
      this.state.showHidePleaseWait(true);
      const contactsWorker: Contacts.Worker = new Contacts.Worker();
      const contact: Contacts.IContact = await contactsWorker.addContact({
        name: this.state.contactName,
        email: this.state.contactEmail,
        owner: this.state.userEmail
      });
      this.state.showHidePleaseWait(false);

      // Add to list.
      cl.push(contact);

      // Update state.
      this.setState({
        contacts: cl,
        contactID: null,
        contactName: "",
        contactEmail: "",
      });
    }.bind(inParentComponent) /* End saveContact(). */,

    /**
     * Delete the currently viewed contact.
     */
    deleteContact: async function (): Promise<void> {
      console.log("state.deleteContact()", this.state.contactID);

      // Delete from server.
      this.state.showHidePleaseWait(true);
      const contactsWorker: Contacts.Worker = new Contacts.Worker();
      await contactsWorker.deleteContact(this.state.contactID);
      this.state.showHidePleaseWait(false);

      // Remove from list.
      const cl = this.state.contacts.filter(
        (inElement) => inElement._id != this.state.contactID
      );

      // Update state.
      this.setState({
        contacts: cl,
        contactID: null,
        contactName: "",
        contactEmail: "",
      });
    }.bind(inParentComponent) /* End deleteContact(). */,

  
    sendMessage: async function (): Promise<void> {
      console.log(
        "state.sendMessage()",
        this.state.messageTo,
        this.state.messageFrom,
        this.state.messageSubject,
        this.state.messageBody
      );


      // Send the message.
      this.state.showHidePleaseWait(true);
      const smtpWorker: SMTP.Worker = new SMTP.Worker();
      await smtpWorker.sendMessage(
        this.state.messageTo,
        this.state.messageFrom,
        this.state.messageSubject,
        this.state.messageBody
      );
      this.state.showHidePleaseWait(false);

      // Update state.
      this.state.showComposeMessage("new");
    }.bind(inParentComponent) /* End sendMessage(). */,

    //load contacts from current user
    loadContacts: async function(): Promise<void>{
      const contactsWorker: Contacts.Worker = new Contacts.Worker();
      const contacts: Contacts.IContact[] = await contactsWorker.listContacts(this.state.userEmail);
      this.state.setContactList(contacts);
      console.log(this.state);
    }.bind(inParentComponent), /* End loadContacts(). */

    //Change view to home page
    goBackToHome: async function (): Promise<void> {
      this.state.showHidePleaseWait(true);
      this.state.showHidePleaseWait(false);
      this.setState({ currentView: "welcome" });
    }.bind(inParentComponent), /* End goBackToHome(). */

    //Login-uptade user email and password and change view
    doLogin: async function (): Promise<void> {
      console.log(
        "state.doLogin()",
        this.state.userEmail,
        this.state.userPass
      )

      this.state.messageFrom = this.state.userEmail;
  
      this.state.showHidePleaseWait(true);
      const loginWorker: Logins.Worker = new Logins.Worker();
      
      await loginWorker.doLogin(
        this.state.userEmail,
        this.state.userPass
      );

      this.state.showHidePleaseWait(false);
      this.setState({ currentView: "compose" });
      this.state.loadContacts();
    }.bind(inParentComponent) /* End doLogin(). */
    
  };
} /* End createState(). */
