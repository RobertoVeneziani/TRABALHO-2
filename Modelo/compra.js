import CompraDAO from "../Persistencia/compraDAO.js";

export default class Compra {
    #codigo;
    #carroCodigo;
    #proprietarioCodigo;

    constructor(codigo = 0, carroCodigo = 0, proprietarioCodigo = 0) {
        this.#codigo = codigo;
        this.#carroCodigo = carroCodigo;
        this.#proprietarioCodigo = proprietarioCodigo;
    }

    get codigo() {
        return this.#codigo;
    }

    set codigo(novoCodigo) {
        this.#codigo = novoCodigo;
    }

    get carroCodigo() {
        return this.#carroCodigo;
    }

    set carroCodigo(novoCarroCodigo) {
        this.#carroCodigo = novoCarroCodigo;
    }

    get proprietarioCodigo() {
        return this.#proprietarioCodigo;
    }

    set proprietarioCodigo(novoProprietarioCodigo) {
        this.#proprietarioCodigo = novoProprietarioCodigo;
    }

    async gravar() {
        const compraDAO = new CompraDAO();
        await compraDAO.gravar(this);
    }

    async excluir() {
        const compraDAO = new CompraDAO();
        await compraDAO.excluir(this);
    }

    async consultar(parametro) {
        const compraDAO = new CompraDAO();
        return await compraDAO.consultar(parametro);
    }
}
