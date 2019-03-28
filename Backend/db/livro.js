const db = require("../config/database");
const dberrors = require("../config/dberrors");

function findAll() {
  return db
    .query("SELECT * FROM livro ORDER BY id ASC")
    .then(result => {
      return result.rows;
    })
    .catch(error => {
      throw dberrors.errors(error);
    });
}

function findbyId(id) {
  return db
    .query("SELECT * FROM livro WHERE id = $1 ORDER BY id ASC", [id])
    .then(result => {
      return result.rows[0];
    })
    .catch(error => {
      throw dberrors.errors(error);
    });
}

function create(data) {
  const { titulo, autor, editora, resumo, imagem } = data;

  return db
    .query(
      `INSERT INTO livro(id, titulo, autor, editora, resumo, imagem)
    VALUES( (select COALESCE(max(id)+1,1) from livro)
    ,$1,$2,$3,$4, $5) RETURNING ID`,
      [titulo, autor, editora, resumo, imagem]
    )
    .then(result => {
      return result.rows[0].id;
    })
    .catch(error => {
      throw dberrors.errors(error);
    });
}

function update(data, id) {
  const { titulo, autor, editora, resumo, imagem } = data;
  return db
    .query(
      `UPDATE livro SET titulo = $1,  autor = $2, editora = $3, resumo = $4, imagem = $5 WHERE id = $6`,
      [titulo, autor, editora, resumo, imagem, id]
    )
    .then(result => {
      return id;
    })
    .catch(error => {
      throw dberrors.errors(error);
    });
}

function remove(id) {
  return db
    .query(`DELETE FROM livro WHERE id = $1`, [id])
    .then(result => {
      return id;
    })
    .catch(err => {
      throw dberrors.errors(error);
    });
}

module.exports = {
  findAll,
  findbyId,
  create,
  update,
  remove
};
