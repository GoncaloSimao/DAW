// React imports.
import React from "react";

// Material-UI imports.
import Button from "@mui/material/Button";
import NewContactIcon from "@mui/icons-material/ContactMail";
import NewMessageIcon from "@mui/icons-material/Email";
import LogoutIcon from '@mui/icons-material/Logout';

/**
 * Toolbar.
 */
const Toolbar = ({ state }) => (
  <div id="navBar">
    <div id="nameOfApp">Send 2 You</div>
    
      <Button
        variant="contained"
        color="primary"
        size="large"
        style={{ marginRight: 10 }}
        onClick={() => state.showComposeMessage("new")}
      >
        <NewMessageIcon style={{ marginRight: 10 }} />
        New Message
      </Button>

      <Button
        variant="contained"
        color="primary"
        size="large"
        style={{ marginRight: 10 }}
        onClick={state.showAddContact}
      >
        <NewContactIcon style={{ marginRight: 10 }} />
        New Contact
      </Button>


      <Button
        variant="contained"
        color="primary"
        size="large"
        style={{ marginRight: 10 }}
        onClick={state.goBackToHome}
      >
        <LogoutIcon style={{ marginRight: 10 }} />
        Logout
      </Button>

    
  </div>
);

export default Toolbar;