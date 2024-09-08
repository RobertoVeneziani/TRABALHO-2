import { Router } from "express";
import ProprietarioCtrl from "../Controle/proprietarioCtrl.js";

const propCtrl = new ProprietarioCtrl();
const rotaProprietario = new Router();

// Definindo as rotas
rotaProprietario
    .get('/', propCtrl.consultar)            // Consultar todos os proprietários
    .get('/:termo', propCtrl.consultar)      // Consultar por termo
    .post('/', propCtrl.gravar)              // Gravar um novo proprietário
    .patch('/', propCtrl.atualizar)          // Atualizar um proprietário
    .put('/', propCtrl.atualizar)            // Atualizar um proprietário
    .delete('/', propCtrl.excluir);          // Excluir um proprietário

export default rotaProprietario;
