const livro = require("./controller");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const _fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}.${path.extname(file.originalname)}`
    );
  }
});

const upload = multer({ storage });

function is_int(value){
  if((parseFloat(value) == parseInt(value)) && !isNaN(value)){
      return true;
  } else {
      return false;
  }
}


function validateForm(req, res, next){
      if(req.body.titulo  &&  req.body.autor &&  req.body.editora && req.body.resumo && req.files ){
          if(req.params.id){
              let parsed = Number.parseInt(req.params.id);
              if (!is_int(parsed)) {
                  res.status(500).send('Campo id inválido')
              }else{
                  next()
              }
          }else{
              next()
          }            
      }else{
          res.status(500).send('Parâmetros Obrigatórios')
      }

 
};

router.get("/", (req, res) => {
  return livro
    .findAll()
    .then(result => {
      res.status(200).send({ result });
    })
    .catch(error => res.status(error.statusCode).send(`Erro ${error.message}`));
});

router.get("/:id", (req, res) => {
  if (req.params.id === null) {
    res.status(500).send("Favor informar o id, parâmentro obrigatório.");
  } else {
    return livro
      .findbyId(req.params.id)
      .then(result => {
        res.status(200).send({ result });
      })
      .catch(error => res.status(error.statusCode).send(`Erro ${error.message}`));
  }
});


router.post("/", upload.any(), validateForm, (req, res) => {
  return livro
    .create(req.body)
    .then(result => {
      const files = req.files;
      if (files) {
        files.forEach(function(file) {
          const id = result;
          _fs.rename(
            file.path,
            `uploads\\${id}${path.extname(file.originalname)}`,
            function(err) {
              if (err)
                res.status(500).send("Não foi possível carregar o arquivo.");
            }
          );
        });
      }

      res.status(200).send({ result });
    })
    .catch(error => res.status(error.statusCode).send(`Erro ${error.message}`));
});

router.put("/:id", validateForm, (req, res) => {
  return livro
    .update(req.body, req.params.id)

    .then(result =>  {
      
      res.status(200).send({ result });
    })
    .catch(error => res.status(error.statusCode).send(`Erro ${error.message}`));
});

router.delete("/:id", (req, res) => {
  if (req.body.id === null) {
    res.status(500).send("Favor informar o id, parâmentro obrigatório.");
  } else {
    return livro
      .remove(req.params.id)
      .then(result => {
        res.status(200).send({ result });
      })
      .catch(error => res.status(error.statusCode).send(`Erro ${error.message}`));
  }
});

module.exports = router;
