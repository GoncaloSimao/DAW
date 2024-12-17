import React from "react";
import { InputBase } from "@mui/material";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";

const LoginView = ({ state }) => (

    <form>

    { /* ----- Message ID and date, just for informational purposes. ----- */ }
    { state.currentView === "message" &&
      <InputBase defaultValue={ `ID ${state.messageID}` } margin="dense" disabled={ true } fullWidth={ true }
        className="messageInfoField" />
    }
    { state.currentView === "message" && <br /> }
    { state.currentView === "message" &&
      <InputBase defaultValue={ state.messageDate } margin="dense" disabled={ true } fullWidth={ true }
        className="messageInfoField" />
    }
    { state.currentView === "message" && <br /> }

    { /* ----- From. ----- */ }
    { state.currentView === "login" &&
      <TextField margin="dense" variant="outlined" fullWidth={ true } label="From" value={ state.messageFrom }
        disabled={ true } InputProps={{ style : { color : "#000000" } }} />
    }
    { state.currentView === "message" && <br /> }
   
    { /* ----- Buttons. ----- */ }

    { state.currentView === "login" &&
      <Button variant="contained" color="primary" size="small" style={{ marginTop:10 }}
        onClick={ state.sendMessage }>
      Send
    </Button>
    }
    { state.currentView === "login" &&
      <Button variant="contained" color="primary" size="small" style={{ marginTop:10, marginRight:10 }}
        onClick={ () => state.showComposeMessage("reply") }>
        Reply
      </Button>
    }
    

  </form>
); 

export default LoginView;