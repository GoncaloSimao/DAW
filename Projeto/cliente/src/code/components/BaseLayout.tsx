// React imports.
import React, { Component } from "react";
import * as Contacts from "../Contacts";
// Library imports.
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// App imports.
import Toolbar from "./Toolbar";
// import MailboxList from "./MailboxList";
// import MessageList from "./MessageList";
import ContactList from "./ContactList";
import WelcomeView from "./WelcomeView";
import ContactView from "./ContactView";
import MessageView from "./MessageView";
import { createState } from "../state";

/**
 * BaseLayout.
 */
class BaseLayout extends Component {
  /**
   * State data for the app.  This also includes all mutator functions for manipulating state.  That way, we only
   * ever have to pass this entire object down through props (not necessarily the best design in terms of data
   * encapsulation, but it does have the benefit of being quite a bit simpler).
   */
  state = createState(this);



  /**
   * Render().
   */
  
  render() {
    return (
      <div className="appContainer">
        <div className="toolbar">
          {this.state.currentView !== "welcome" &&  <Toolbar state={this.state} />}
        </div>
        <div className="container2">
          <div className="centerViews">
            {this.state.currentView === "welcome" && <WelcomeView state={this.state} />}
            {(this.state.currentView === "message" ||
              this.state.currentView === "compose") && (
              <MessageView state={this.state} />
            )}
            {(this.state.currentView === "contact" ||
              this.state.currentView === "contactAdd") && (
              <ContactView state={this.state} />
            )}
          </div>
          <div className="contactList">
          {this.state.currentView !== "welcome" &&  <ContactList state={this.state} />}
          </div>
        </div>
      </div>
    );
  } /* End render(). */
} /* End class. */

export default BaseLayout;
