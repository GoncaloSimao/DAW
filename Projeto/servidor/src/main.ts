import path from "path";
import express, { Express, NextFunction, Request, Response } from "express";

import { serverInfo } from "./serverInfo";
import * as SMTP from "./SMTP";
import * as Contacts from "./contacts";
import { IContact } from "./contacts";
import * as Users from "./users"; // Importa o módulo de usuários
import { IUser } from "./users";
import { ILogin, LoginWorker } from "./login";

const app: Express = express();

app.use(express.json());
app.use(
  "/",
  express.static(path.join(__dirname, "../../cliente/dist"))
);

app.use(function (
  inRequest: Request,
  inResponse: Response,
  inNext: NextFunction
) {
  inResponse.header("Access-Control-Allow-Origin", "*");
  inResponse.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
  inResponse.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  inNext();
});

const loginWorker = new LoginWorker(); // Instância do gerenciador de login

// Rota para envio de mensagens
app.post("/messages", async (inRequest: Request, inResponse: Response) => {
  try {
    const smtpWorker: SMTP.Worker = new SMTP.Worker(serverInfo);
    await smtpWorker.sendMessage(inRequest.body);
    inResponse.send("ok");
  } catch (inError) {
    inResponse.send("error");
  }
});

// Rota para listar contatos
app.get("/contacts", async (inRequest: Request, inResponse: Response) => {
  try {
    const contactsWorker: Contacts.Worker = new Contacts.Worker();
    const contacts: IContact[] = await contactsWorker.listContacts(
      inRequest.query.owner as string
    );
    inResponse.json(contacts);
  } catch (inError) {
    inResponse.send("error");
  }
});

// Rota para adicionar contatos
app.post("/contacts", async (inRequest: Request, inResponse: Response) => {
  try {
    const contactsWorker: Contacts.Worker = new Contacts.Worker();
    const contact: IContact = await contactsWorker.addContact(inRequest.body);
    inResponse.json(contact);
  } catch (inError) {
    inResponse.send("error");
  }
});

// Rota para deletar contatos
app.delete(
  "/contacts/:id",
  async (inRequest: Request, inResponse: Response) => {
    try {
      const contactsWorker: Contacts.Worker = new Contacts.Worker();
      await contactsWorker.deleteContact(inRequest.params.id);
      inResponse.send("ok");
    } catch (inError) {
      inResponse.send("error");
    }
  }
);

// Rota para login do usuário
app.post("/doLogin", async (inRequest: Request, inResponse: Response) => {
  try {
    const success = loginWorker.alterarServerInfo(inRequest.body);
    if (success) {
      inResponse.json({ success: true });
    } else {
      inResponse.status(500).json({ success: false });
    }
  } catch (inError) {
    inResponse.send("error");
  }
});

// Rota para registrar um novo usuário
app.post("/register", async (inRequest: Request, inResponse: Response) => {
  try {
    const newUser: ILogin = await loginWorker.registerUser(inRequest.body);
    inResponse.json(newUser);
  } catch (error) {
    inResponse.status(500).send("Error registering user");
  }
});

// Rota para validar login
app.post("/login", async (inRequest: Request, inResponse: Response) => {
  try {
    const user: ILogin | null = await loginWorker.validateUser(
      inRequest.body.email,
      inRequest.body.password
    );
    if (user) {
      inResponse.json({ success: true, user });
    } else {
      inResponse.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    inResponse.status(500).send("Error logging in");
  }
});

app.listen(8080);
