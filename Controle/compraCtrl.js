import Compra from "../Modelo/compra.js";

export default class CompraCtrl {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const carroCodigo = dados.carroCodigo;
            const proprietarioCodigo = dados.proprietarioCodigo;
            if (carroCodigo && proprietarioCodigo) {
                const compra = new Compra(0, carroCodigo, proprietarioCodigo);
                compra.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Compra registrada com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao registrar a compra: " + erro.message
                    });
                });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código do carro e do proprietário!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para registrar uma compra!"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const carroCodigo = dados.carroCodigo;
            const proprietarioCodigo = dados.proprietarioCodigo;
            if (carroCodigo && proprietarioCodigo) {
                const compra = new Compra(0, carroCodigo, proprietarioCodigo);
                compra.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Compra excluída com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao excluir a compra: " + erro.message
                    });
                });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código do carro e do proprietário!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir uma compra!"
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');
        let termo = requisicao.params.termo || "";
        if (requisicao.method === 'GET') {
            const compra = new Compra();
            compra.consultar(termo).then((listaCompras) => {
                resposta.json({
                    status: true,
                    listaCompras
                });
            }).catch((erro) => {
                resposta.json({
                    status: false,
                    mensagem: "Não foi possível obter as compras: " + erro.message
                });
            });
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar compras!"
            });
        }
    }
}
