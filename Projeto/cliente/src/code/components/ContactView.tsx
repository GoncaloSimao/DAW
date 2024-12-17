import React from "react";

// Material-UI imports.
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";

/**
 * ContactView.
 */
const ContactView = ({ state }) => (
  <form id="contactForm" style={{ color: "#FFFFFF" }}>
    <TextField
      margin="dense"
      id="contactName"
      label="Name"
      value={state.contactName}
      variant="outlined"
      InputProps={{ style: { color: "#FFFFFF" } }}
      InputLabelProps={{ style: { color: "#FFFFFF" } }}
      disabled={state.currentView === "contact"}
      style={{ width: 520 }}
      sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#2d4ca3",
          },
        },
      }}
      onChange={state.fieldChangeHandler}
    />
    <br />
    <TextField
      margin="dense"
      id="contactEmail"
      label="Email"
      value={state.contactEmail}
      variant="outlined"
      InputProps={{ style: { color: "#FFFFFF" } }}
      InputLabelProps={{ style: { color: "#FFFFFF" } }}
      disabled={state.currentView === "contact"}
      style={{ width: 520 }}
      sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#2d4ca3",
          },
        },
      }}
      onChange={state.fieldChangeHandler}
    />
    <br />
    {/* Hide/show buttons as appropriate. Note that we have to use this form of onClick() otherwise the event */}
    {/* object would be passed to addContact() and the branching logic would fail. */}
    {state.currentView === "contactAdd" && (
      <Button
        variant="contained"
        color="primary"
        size="small"
        style={{ marginTop: 10, color: "#FFFFFF" }}
        onClick={state.saveContact}
      >
        Save
      </Button>
    )}
    {state.currentView === "contact" && (
      <Button
        variant="contained"
        color="primary"
        size="small"
        style={{ marginTop: 10, marginRight: 10, color: "#FFFFFF" }}
        onClick={state.deleteContact}
      >
        Delete
      </Button>
    )}
    {state.currentView === "contact" && (
      <Button
        variant="contained"
        color="primary"
        size="small"
        style={{ marginTop: 10, color: "#FFFFFF" }}
        onClick={() => state.showComposeMessage("contact")}
      >
        Send Email
      </Button>
    )}
  </form>
); /* ContactView. */

export default ContactView;
