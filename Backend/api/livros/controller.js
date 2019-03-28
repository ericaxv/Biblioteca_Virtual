const db = require("../../db/livro");

function findAll() {
  return db.findAll().then(result=> {return result}).catch(error=>{throw error}  );
}

function findbyId(id) {
  return db.findbyId(id).then(result=> {return result}).catch(error=>{throw error}  );
}

function create(data) {
  return db.create(data).then(result=> {return result}).catch(error=>{throw error}  );
}

function update(data, id) {
  return db.update(data, id).then(result=> {return result}).catch(error=>{throw error}  );
}

function remove(id) {
  return db.remove(id).then(result=> {return result}).catch(error=>{throw error}  );
}

module.exports = {
  findAll,
  findbyId,
  create,
  update,
  remove
};
