const schemaDB = [
    {
        key: 'livro_pkey',
        message: 'Já existe um livro com o id informado.',
    },
];


const traducoes = [
    ...schemaDB,
];

const traduzirErrorPostGre = (key, message) => {
    const traducao = traducoes.find(i => i.key === key);

    return traducao ? traducao.message : message;
};


module.exports = traduzirErrorPostGre;
