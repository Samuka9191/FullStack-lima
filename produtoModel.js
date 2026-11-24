const db = require('../config/database');

const produtoModel = {
    async listarTodos() {
        const [linhas] = await db.query(
            'SELECT id, nome, preco, criado_em FROM produtos ORDER BY id DESC'
        );
        return linhas;
    },

    async buscarPorID(){
        const [linhas] = await db.query (
            'SELECT id, nome, descricao, preco, criado_em FROM produtos WHERE id = ?',
            [id]
        );
        return linhas[0]
    }
}
