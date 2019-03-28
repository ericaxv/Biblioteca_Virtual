import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table
} from "reactstrap";

import api from "../../services/api";
import { toast } from "react-toastify";

const LivroRow = ({ itens, remover }) => {
  //console.log( item );
const LivroLink = `/livros/${itens.id}`;
const ArquivoLink = `/arquivo/${itens.id}`;


  
  
  return (
    <tr>
      <td>
        <Row>
          <Col className="col-md-2">
            <img src={itens.imagem} width="130" />
          </Col>

          <br />

          <Col className="col-md-10">
            <h5>{itens.titulo}</h5>
            Autor: {itens.autor}
            <br />
            Editora: {itens.editora}
            <br />
            Resumo: {itens.resumo}
            <br />
            <br />
            <footer>
              <Link
                to={LivroLink}
                className="btn btn-success bt-brand icon mr-1 mb-1"
              >
                <i className="fa fa-edit" />
              </Link>
              <Button
                className="btn btn-danger bt-brand icon mr-1 mb-1"
                onClick={() => remover(itens.id)}
              >
                <i className="fa fa-trash-o" />
              </Button>
             
              <Link
                to={ArquivoLink}
                className="btn btn-primary bt-brand icon mr-1 mb-1"
              >
                <i className="fa fa-file" />
              </Link>
            </footer>
          </Col>
        </Row>
      </td>
    </tr>
  );
};

class Lista extends Component {
  state = {
    livros: []
  };

  listarLivros = () => {
    api
      .get("/livros")
      .then(res => this.setState({ livros: res.data.result }))
      .catch(error =>
        toast.error("Erro ao Listar os livros!", {
          position: "bottom-right",
          className: "danger",
          closeOnClick: true
        })
      );
  };

  excluirLivro = id => {
    api
      .delete(`/livros/${id}`)
      .then(res => {
        toast.success("Livro excluído com sucesso!", {
          position: "bottom-right",
          className: "success",
          closeOnClick: true
        });
      })
      .catch(error => {
        toast.error("Erro ao Excluir o Livro!", {
          position: "bottom-right",
          className: "danger",
          closeOnClick: true
        });
      });

    this.setState({
      livros: this.state.livros.filter(itens => itens.id && itens.id !== id)
    });
  };

  componentDidMount() {
    this.listarLivros();
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <strong> Livros Cadastrados</strong>
                <span className="pull-right">
                  <Link to={"/livros/novo"} className="btn btn-md btn-success fa fa-plus">
                  
                  </Link>
                </span>
              </CardHeader>
              <CardBody>
                <Row>
                  <Table responsive hover striped>
                    <tbody>
                      {this.state.livros.map(itens => (
                        <LivroRow
                          key={itens.id}
                          itens={itens}
                          remover={this.excluirLivro}
                        />
                      ))}
                    </tbody>
                  </Table>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Lista;
