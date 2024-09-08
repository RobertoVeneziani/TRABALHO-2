import { Router } from "express";
import CompraCtrl from "../Controle/compraCtrl.js";

const compraCtrl = new CompraCtrl();
const rotaCompra = new Router();

rotaCompra
    .post('/', compraCtrl.gravar)
    .delete('/', compraCtrl.excluir)
    .get('/:termo', compraCtrl.consultar);

export default rotaCompra;
