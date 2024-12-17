import * as path from "path";
const Datastore = require("nedb");

// Inicializa o banco de dados
const db = new Datastore({
  filename: path.join(__dirname, "users.db"),
  autoload: true,
});

// Dados do usuário inicial
const user = {
  email: "usuario@exemplo.com",
  password: "senha123",
};

// Insere o usuário no banco
db.insert(user, (err: Error | null, newDoc: any) => {
  if (err) {
    console.error("Erro ao criar banco de dados:", err);
  } else {
    console.log("Banco de dados inicializado com sucesso.");
    console.log("Usuário criado:", newDoc);
  }
});
