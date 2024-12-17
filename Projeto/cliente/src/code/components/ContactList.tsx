// React imports.
import React from "react";

// Material-UI imports.
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Person from "@mui/icons-material/Person";
import ListItemText from "@mui/material/ListItemText";

/**
 * Contacts.
 */
const ContactList = ({ state }) => (
  <List style={{ color: "#FFFFFF" }}>
    {state.contacts.map((value) => {
      return (
        <ListItem
          key={value._id}
          button
          onClick={() =>
            state.showContact(value._id, value.name, value.email)
          }
          sx={{
            backgroundColor: "#2d4ca3", // Azul para os itens.
            marginBottom: "8px",
            borderRadius: "5px",
            "&:hover": {
              backgroundColor: "#1a346b", // Azul escuro ao passar o mouse.
            },
          }}
        >
          <ListItemAvatar>
            <Avatar sx={{ backgroundColor: "#FFFFFF", color: "#2d4ca3" }}>
              <Person />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={`${value.name}`}
            primaryTypographyProps={{ style: { color: "#FFFFFF" } }}
          />
        </ListItem>
      );
    })}
  </List>
); /* End Contacts. */

export default ContactList;
