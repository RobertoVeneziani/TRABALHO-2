import Proprietario from "../Modelo/proprietario.js";

export default class ProprietarioCtrl {

    constructor() {
        this.gravar = this.gravar.bind(this);
        this.atualizar = this.atualizar.bind(this);
        this.excluir = this.excluir.bind(this);
        this.consultar = this.consultar.bind(this);
    }

    async gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const nome = dados.nome;
            if (nome) {
                const proprietario = new Proprietario(0, nome);
                try {
                    await proprietario.gravar();
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": proprietario.codigo,
                        "mensagem": "Proprietário incluído com sucesso!"
                    });
                } catch (erro) {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao registrar o proprietário: " + erro.message
                    });
                }
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o nome do proprietário!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar um proprietário!"
            });
        }
    }

    async atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            const nome = dados.nome;
            if (codigo && nome) {
                const proprietario = new Proprietario(codigo, nome);
                try {
                    await proprietario.atualizar();
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Proprietário atualizado com sucesso!"
                    });
                } catch (erro) {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao atualizar o proprietário: " + erro.message
                    });
                }
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código e o nome do proprietário!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar um proprietário!"
            });
        }
    }

    async excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            if (codigo) {
                const proprietario = new Proprietario(codigo);
                try {
                    const possui = await proprietario.possuiCarros();
                    if (!possui) {
                        await proprietario.excluir();
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Proprietário excluído com sucesso!"
                        });
                    } else {
                        resposta.status(400).json({
                            "status": false,
                            "mensagem": "Este proprietário possui carros e não pode ser excluído!"
                        });
                    }
                } catch (erro) {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao excluir o proprietário: " + erro.message
                    });
                }
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código do proprietário!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir um proprietário!"
            });
        }
    }

    async consultar(requisicao, resposta) {
        resposta.type('application/json');
        let termo = requisicao.params.termo || "";
        if (requisicao.method === 'GET') {
            try {
                const proprietario = new Proprietario();
                const listaProprietarios = await proprietario.consultar(termo);
                resposta.json({
                    status: true,
                    listaProprietarios
                });
            } catch (erro) {
                resposta.json({
                    status: false,
                    mensagem: "Não foi possível obter os proprietários: " + erro.message
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar proprietários!"
            });
        }
    }
}
