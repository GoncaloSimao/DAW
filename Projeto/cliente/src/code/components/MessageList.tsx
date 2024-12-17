// React imports.
import React from "react";
import { InputBase } from "@mui/material";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";

/**
 * MessageView.
 */
const MessageView = ({ state }) => (
  <form id="sendEmailForma" style={{ color: "#FFFFFF" }}>
    {/* ----- Message ID and date, just for informational purposes. ----- */}
    {state.currentView === "message" && (
      <InputBase
        defaultValue={`ID ${state.messageID}`}
        margin="dense"
        disabled={true}
        fullWidth={true}
        style={{
          color: "#FFFFFF",
          border: "1px solid #2d4ca3",
          borderRadius: "5px",
          padding: "5px",
          width: "800px",
        }}
        className="messageInfoField"
      />
    )}
    {state.currentView === "message" && <br />}
    {state.currentView === "message" && (
      <InputBase
        defaultValue={state.messageDate}
        margin="dense"
        disabled={true}
        fullWidth={true}
        style={{
          color: "#FFFFFF",
          border: "1px solid #2d4ca3",
          borderRadius: "5px",
          padding: "5px",
          width: "800px",
        }}
        className="messageInfoField"
      />
    )}
    {state.currentView === "message" && <br />}

    {/* ----- From. ----- */}
    {state.currentView === "message" && (
      <TextField
        margin="dense"
        variant="outlined"
        label="From"
        value={state.messageFrom}
        disabled={true}
        style={{ width: 800 }}
        InputProps={{ style: { color: "#FFFFFF" } }}
        InputLabelProps={{ style: { color: "#FFFFFF" } }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#2d4ca3",
            },
          },
        }}
      />
    )}
    {state.currentView === "message" && <br />}

    {/* ----- To. ----- */}
    {state.currentView === "compose" && (
      <TextField
        margin="dense"
        id="messageTo"
        variant="outlined"
        fullWidth={true}
        label="To"
        value={state.messageTo}
        style={{ width: 800 }}
        InputProps={{ style: { color: "#FFFFFF" } }}
        InputLabelProps={{ style: { color: "#FFFFFF" } }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#2d4ca3",
            },
          },
        }}
        onChange={state.fieldChangeHandler}
      />
    )}
    {state.currentView === "compose" && <br />}

    {/* ----- Subject. ----- */}
    <TextField
      margin="dense"
      id="messageSubject"
      label="Subject"
      variant="outlined"
      fullWidth={true}
      value={state.messageSubject}
      disabled={state.currentView === "message"}
      style={{ width: 800 }}
      InputProps={{ style: { color: "#FFFFFF" } }}
      InputLabelProps={{ style: { color: "#FFFFFF" } }}
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

    {/* ----- Message body. ----- */}
    <TextField
      margin="dense"
      id="messageBody"
      variant="outlined"
      fullWidth={true}
      multiline={true}
      rows={12}
      value={state.messageBody}
      disabled={state.currentView === "message"}
      style={{ width: 800 }}
      InputProps={{ style: { color: "#FFFFFF" } }}
      InputLabelProps={{ style: { color: "#FFFFFF" } }}
      sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#2d4ca3",
          },
        },
      }}
      onChange={state.fieldChangeHandler}
    />

    {/* ----- Buttons. ----- */}
    {state.currentView === "compose" && (
      <Button
        variant="contained"
        color="primary"
        size="small"
        style={{ marginTop: 10, color: "#FFFFFF" }}
        onClick={state.goBackToHome}
      >
        Cancel
      </Button>
    )}
    {state.currentView === "compose" && (
      <Button
        variant="contained"
        color="primary"
        size="small"
        style={{ marginTop: 10, color: "#FFFFFF" }}
        onClick={state.sendMessage}
      >
        Send
      </Button>
    )}
    {state.currentView === "message" && (
      <Button
        variant="contained"
        color="primary"
        size="small"
        style={{ marginTop: 10, marginRight: 10, color: "#FFFFFF" }}
        onClick={() => state.showComposeMessage("reply")}
      >
        Reply
      </Button>
    )}
    {state.currentView === "message" && (
      <Button
        variant="contained"
        color="primary"
        size="small"
        style={{ marginTop: 10, color: "#FFFFFF" }}
        onClick={state.deleteMessage}
      >
        Delete
      </Button>
    )}
  </form>
); /* MessageView. */

export default MessageView;
