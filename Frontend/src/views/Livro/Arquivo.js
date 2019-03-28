import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Row
} from "reactstrap";
import api from "../../services/api";

const TITULO_ARQUIVO = "Livro em PDF";

class Arquivo extends Component {
  state = {
    Titulo: TITULO_ARQUIVO,
    id: "",
    file: "",
    path_file: ""
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      api
        .get(`livros/${id}`)
        .then(res => {
          const { id,} = res.data.result;
          this.setState({
            id,
            });
          this.setState({
            path_file: `http://localhost:7000/uploads/${this.state.id}.pdf`
          });
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
                  <Col xs="12">
                    <FormGroup>
                     
                      <iframe src={this.state.path_file} height="600" width="100%"  />
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Arquivo;
