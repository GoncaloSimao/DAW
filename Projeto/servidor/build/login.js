"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.alterarServerInfo = void 0;
const path = __importStar(require("path")); //aqui está a ser feito o import de todos os modulos da biblioteca path que serve para nós manipularmos paths.
const fs = __importStar(require("fs"));
//funcao para ler a informacao do serverinfo, e reescreve-lo com as informacoes do login do cliente
function alterarServerInfo(login) {
    const data = fs.readFileSync(path.join(__dirname, "../server/serverInfo.json"), "utf8");
    const info = JSON.parse(data);
    info.smtp.auth.user = login.useremail;
    info.smtp.auth.pass = login.userpass;
    fs.writeFileSync(path.join(__dirname, "../server/serverInfo.json"), JSON.stringify(info, null, 2));
    return true;
}
exports.alterarServerInfo = alterarServerInfo;
