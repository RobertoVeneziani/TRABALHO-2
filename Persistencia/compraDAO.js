import conectar from "./conexao.js";
import Compra from "../Modelo/compra.js"; // Ajuste conforme necessário

export default class CompraDAO {

    async gravar(compra) {
        if (compra instanceof Compra) {
            const sql = "INSERT INTO compra(car_codigo, prop_codigo) VALUES(?, ?)";
            const parametros = [compra.carroCodigo, compra.proprietarioCodigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async excluir(compra) {
        if (compra instanceof Compra) {
            const sql = "DELETE FROM compra WHERE car_codigo = ? AND prop_codigo = ?";
            const parametros = [compra.carroCodigo, compra.proprietarioCodigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async consultar(parametro) {
        let sql = '';
        let parametros = [];
        if (!isNaN(parseInt(parametro))) {
            sql = 'SELECT * FROM compra WHERE comp_codigo = ?';
            parametros = [parametro];
        } else {
            sql = 'SELECT * FROM compra WHERE car_codigo = ? OR prop_codigo = ?';
            parametros = [parametro, parametro];
        }
        const conexao = await conectar();
        const [registros] = await conexao.execute(sql, parametros);
        await conexao.release();
        return registros;
    }
}
