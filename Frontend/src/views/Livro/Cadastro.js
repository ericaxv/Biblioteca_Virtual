import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
  
} from "reactstrap";
import api from "../../services/api";

const TITULO_NOVO = "Novo Livro";
const TITULO_EDICAO = "Editar Livro";

class Cadastro extends Component {
  state = {
    Titulo: TITULO_NOVO,
    id: "",
    titulo: "",
    autor: "",
    editora: "",
    resumo: "",
    imagem: "",
    file: "",
    path_file: ""
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleInputFileChange = e => {
    const file = e.target.files[0];
    this.setState({ file: file });
  };

  handleSubmit = async () => {
    const { id, titulo, autor, editora, resumo, imagem, file } = this.state;

    if (id) {
      await api
        .put(`/livros/${id}`, { titulo, autor, editora, resumo, imagem })
        .then(res => {
          toast.success("Dados Atualizados com Sucesso!", {
            position: "bottom-right",
            className: "success",
            closeOnClick: true
          });
        })
        .catch(error =>
          toast.error("Dados Inválidos!", {
            position: "bottom-right",
            className: "danger",
            closeOnClick: true
          })
        );
    } else {
      const FormData = require('form-data');
      const bodyFormData = new FormData();
       bodyFormData.set('titulo', titulo);
       bodyFormData.set('autor', autor);
       bodyFormData.set('editora', editora);
       bodyFormData.set('resumo', resumo);
       bodyFormData.set('imagem', imagem);
       bodyFormData.set('file', file);
      await api
        .post("/livros", bodyFormData, 
        {config: { headers: {'Content-Type': 'multipart/form-data'} } } )
        .then(res =>
          toast.success("Dados Inseridos com Sucesso!", {
            position: "bottom-right",
            className: "success",
            closeOnClick: true
          })
        )
        .catch(error =>
          toast.error("Dados Inválidos!", {
            position: "bottom-right",
            className: "danger",
            closeOnClick: true
          })
        );
    }
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      api
        .get(`livros/${id}`)
        .then(res => {
          const {
            id,
            titulo,
            autor,
            editora,
            resumo,
            imagem,
             
          } = res.data.result;
          this.setState({
            id,
            titulo,
            autor,
            editora,
            resumo,
            imagem,
            Titulo: TITULO_EDICAO
          });
           this.setState({path_file: `http://localhost:7000/uploads/${this.state.id}.pdf`})
        })
        .catch();
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12">
            <Card>
              <CardHeader>
                <strong>{this.state.Titulo}</strong>
                <span className="pull-right">
                  <Link to={"/livros"} className="btn btn-md btn-danger fa fa-undo">
                   
                  </Link>
                </span>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="titulo">TÍTULO </Label>
                      <Input
                        type="text"
                        name="titulo"
                        id="titulo"
                        placeholder="Informe o título do Livro"
                        value={this.state.titulo}
                        onChange={this.handleInputChange}
                      />
                    </FormGroup>
                    </Col>
                    <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="autor">AUTOR</Label>
                      <Input
                        type="text"
                        name="autor"
                        id="autor"
                        placeholder="Informe o Autor"
                        value={this.state.autor}
                        onChange={this.handleInputChange}
                      />
                    </FormGroup>
                    </Col>
                 
                </Row>
                <Row>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="autor">EDITORA</Label>
                      <Input
                        type="text"
                        name="editora"
                        id="editora"
                        placeholder="Informe a Editora"
                        value={this.state.editora}
                        onChange={this.handleInputChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="editora">IMAGEM </Label>
                      <Input
                        type="text"
                        name="imagem"
                        id="imagem"
                        placeholder="Informe o link da imagem."
                        value={this.state.imagem}
                        onChange={this.handleInputChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="resumo">RESUMO</Label>
                      <Input
                        type="text"
                        name="resumo"
                        id="resumo"
                        value={this.state.resumo}
                        onChange={this.handleInputChange}
                        
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="file">ARQUIVO</Label>
                      {!this.state.id  ?
                                            <Input type="file" name="file" id="file"
                                            placeholder="Selecione o arquivo"
                                            onChange={this.handleInputFileChange} />
                                        :    
                                        
                                        <Input
                                        placeholder= "Arquivo já selecionado"
                                        />
                                       
                                                                               
                                           
                                        }
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Button
                    className="btn btn-block btn-success"
                    onClick={this.handleSubmit}
                  >
                    Salvar
                  </Button>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Cadastro;
